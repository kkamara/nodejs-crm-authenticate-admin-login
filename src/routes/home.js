const express = require('express');
const { QueryTypes, } = require('sequelize');
const config = require('../config');
const db = require('../database');

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

  req.session.route = { name: 'Dashboard', };
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
  req.session.save(function(err) {
    if (err) {
        console.log(err)
    }
  })

  res.render('home.pug', {
      config,
      title: req.session.route.name,
      session: req.session,
  });

  req.session.destroy(req.sessionID, function(err) {
    if (err) {
        console.log(err)
    }
  })
})

module.exports = home;