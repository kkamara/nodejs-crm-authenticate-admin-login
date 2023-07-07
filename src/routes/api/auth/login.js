const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const user = require('../../../models/user');

const login = express.Router();

login.get('/', async (req, res) => {

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
  
  let newSession = { page: req.session.page, auth: req.session.auth, };
  let session = deepClone(newSession);
  await new Promise((resolve, reject) => {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve();
    });
  });

  const user = user.authenticate(req.bodyString('email'), res.bodyString('password'));
  if (!user) {
    req.session.page.error = 'Unable to authenticate user due to invalid combination.';
    newSession = { page: req.session.page, auth: req.session.auth, };
    session = deepClone(newSession);
    res.status(400);
    return res.json({
      data: {
        routeName: session.page.title,
        user: session,
      },
    });
  }
  return res.json({
    data: {
      routeName: session.page.title,
      user: session,
    },
});
});

module.exports = login;