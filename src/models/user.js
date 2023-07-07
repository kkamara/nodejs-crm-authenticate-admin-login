const { QueryTypes, } = require('sequelize');
const config = require('../config');
const db = require('../database');
const { validate, } = require('email-validator');

/**
 * @param {string} email
 * @return {object|false}
 */
const getUser = async (email) => {
  let res = false
  const [results, metadata] = await db.query(
    `SELECT uid, password FROM users where users.email=? LIMIT 1`, 
    {
        replacements: [ email, ],
        type: QueryTypes.SELECT,
    },
  );
  if (!results) {
    return res;
  }
  res = results[0];
  return res;
};

/**
 * Add logic to authenticate user.
 * - Using req.body, bcrypt (12 salt rounds) & jwt.
 * - Bcrypt token: 
 *    $2a$12$06CVr6F/0HWuTMy4Nh/UB.ICDTGx639ZWRpyeAYMTLjTuSBkAcZny
 * @param {string} email
 * @param {string} password
 * @return {object|false}
 */
const authenticate = async (email, password) => {
  let res = false;
  const user = getUser(email);
  if (!user) {
    return res;
  }

  if (user.password !== password) {
    return res;
  }
  
  res = true;
  return res;
};

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {true|array}
 */
const validateAuthenticate = async (email, password) => {
  let res = [];
  if (!email) {
    res.push('Missing email field.');
  } else if (email.length > 1024) {
    res.push('Email field exceeds 1024 character limit.')
  } else if (!validate(email)) {
    res.push('Email field must be a valid email.')
  }
  if (!password) {
    res.push('Missing email field.');
  } else if (password.length > 100) {
    res.push('Password field exceeds 100 character limit.')
  }

  if (!res.length) {
    res = true;
  }
  return res;
};

module.exports = {
  authenticate,
  validateAuthenticate,
};
