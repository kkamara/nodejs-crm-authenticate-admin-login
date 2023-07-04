const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../config');
const db = require('../../database');

const home = express.Router();

home.get('/', async (req, res) => {
  let author = 'Jane Doe';
  const [results, metadata] = await db.query(
      "SELECT uid, title, author FROM books where author=? ORDER BY uid ASC LIMIT 1", 
      {
          replacements: [ author, ],
          type: QueryTypes.SELECT,
      },
  );

  req.session.page = { title: 'Dashboard', };
  req.session.auth = {
    name: 'Jane Doe',
    lastLogin: '2023-07-03 16:40:00',
    permissions: [
      'view client',
      'create client',
      'view user',
      'create user',
      'view log',
      'create log',
    ], 
  };

  await new Promise((resolve, reject) => {
    req.session.save(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve()
    });
  });
  
  const newSession = { page: req.session.page, auth: req.session.auth, };
  const session = deepClone(newSession);
  await new Promise((resolve, reject) => {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve();
    });
  });
  
  res.status(200);
  return res.json({
      data: {
        results,
        routeName: session.page.title,
        user: session,
      },
  });
})

module.exports = home;