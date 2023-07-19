'use strict';
const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../config');
const db = require('../../database');
const { 
  validateAuthenticate,
  authenticate,
  getNewToken,
} = require('../../models/user');

const login = express.Router();

login.get('/', async (req, res) => {
  req.session.page = { title: 'Admin Login', };
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
  
  return res.render('admin/auth/login.pug', {
      config,
      title: session.page.title,
      session,
  });
});

login.post('/', async (req, res) => {
  req.session.page = { title: 'Admin Login Action', };
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
  
  const email = req.bodyString('email');
  const password = req.bodyString('password');

  const validInput = validateAuthenticate(email, password);
  if (validInput instanceof Array) {
    res.status(400);
    return res.json({ 
      message: 'Bad request.',
      errors: validInput,
    });
  }

  const user = await authenticate(email, password);
  req.session.auth = user;
  if (!user) {
    res.status(400);
    return res.json({ message: 'Invalid user and password combination.' });
  }

  const token = await getNewToken(user.uid);
  req.session.auth.token = token;

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
    routeName: session.page.title,
    user: session, 
  });
});

module.exports = login;