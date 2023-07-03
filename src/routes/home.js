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

  req.session.auth = { permissions: [
    'view_client',
    'create_client',
    'view_user',
    'create_user',
  ], }

  return res.render('home.pug', {
      config,
      title: 'Homepage',
      session: req.session,
      data: [
          results, 
          results2, 
      ],
  });
})

module.exports = home;