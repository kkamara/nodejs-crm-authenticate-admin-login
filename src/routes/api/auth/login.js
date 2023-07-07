const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../../config');
const db = require('../../../database');

const login = express.Router();

login.get('/', async (req, res) => {
  // let author = 'Jane Doe';
  // const [results, metadata] = await db.query(
  //     "SELECT uid, title, author FROM books where author=? ORDER BY uid ASC LIMIT 1", 
  //     {
  //         replacements: [ author, ],
  //         type: QueryTypes.SELECT,
  //     },
  // );

  req.session.page = { 
    title: 'Login',
    loginEmails: [
      'admin@mail.com',
      'clientadmin@mail.com',
      'clientuser@mail.com',
    ],
  };
  req.session.auth = null;

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
        routeName: session.page.title,
        user: session,
      },
  });
})

login.post('/', async (req, res) => {
  req.session.page = { 
    title: 'Login Action',
    loginEmails: [
      'admin@mail.com',
      'clientadmin@mail.com',
      'clientuser@mail.com',
    ],
  };
  req.session.auth = null;

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

  // Add logic to authenticate user.
  // - Using req.body, bcrypt (12 salt rounds) & jwt.
  // - Bcrypt token: 
  //    $2a$12$06CVr6F/0HWuTMy4Nh/UB.ICDTGx639ZWRpyeAYMTLjTuSBkAcZny

  return res.json({
    data: {
      routeName: session.page.title,
      user: session,
    },
});
});

module.exports = login;