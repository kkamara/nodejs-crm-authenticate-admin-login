const { QueryTypes, } = require('sequelize');
const config = require('../config');
const db = require('../database');

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
export const authenticate = async (email, password) => {
  let res = null;
  const user = getUser(email);
  if (!user) {
    res = false;
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
export const validateAuthenticate = async (email, password) => {
  // Add error handling logic.
  if (!email) {

  }
};
