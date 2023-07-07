const { QueryTypes, } = require('sequelize');
const config = require('../config');
const db = require('../database');

/*
 * Add logic to authenticate user.
 * - Using req.body, bcrypt (12 salt rounds) & jwt.
 * - Bcrypt token: 
 *    $2a$12$06CVr6F/0HWuTMy4Nh/UB.ICDTGx639ZWRpyeAYMTLjTuSBkAcZny
 * @param {string} email
 * @param {string} password
 * @return {object}
 */
export const authenticate = async (email, password) => {
  let author = 'Jane Doe';
  const [results, metadata] = await db.query(
      "SELECT uid, title, author FROM books where author=? ORDER BY uid ASC LIMIT 1", 
      {
          replacements: [ author, ],
          type: QueryTypes.SELECT,
      },
  );

  // add logic

  return results;
};
