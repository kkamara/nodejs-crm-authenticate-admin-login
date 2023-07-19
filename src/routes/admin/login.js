'use strict';
const express = require('express');
const { QueryTypes, } = require('sequelize');
const deepClone = require('deep-clone');
const config = require('../../config');
const db = require('../../database');

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
  
  const newSession = { page: req.session.page, auth: req.session.auth, };
  const session = deepClone(newSession);

  const email = req.bodyString('email');
  const password = req.bodyString('password');

  if (!email) {
    res.status(400);
    return res.json({ message: 'Missing email field.' });
  }

  if (!password) {
    res.status(400);
    return res.json({ message: 'Missing password field.' });
  }

  const user = user.authenticate(email, password);
  req.session.auth = user;
  if (!user) {
    res.status(400);
    return res.json({ message: 'Invalid user and password combination.' });
  }

  await new Promise((resolve, reject) => {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err)
        return reject(err);
      }
      resolve();
    });
  });
  
  return res.redirect('/admin/dashboard');
});

module.exports = login;