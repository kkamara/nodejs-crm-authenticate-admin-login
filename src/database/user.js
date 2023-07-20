'use strict';
const { DataTypes, } = require("sequelize");
const { log, error, } = require('console');
const sequelize = require('.');
const { encrypt, } = require('../models/user');

const User = sequelize.define("users", {
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_created: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  password_salt: {
    type: DataTypes.STRING,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  building_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email_reset_key: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

sequelize.sync().then(() => {
  log('User table created successfully!');

  const { hash, salt } = encrypt('secret');

  User.create({
    username: 'tomato.pear',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@mail.com',
    password: hash,
    password_salt: salt,
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
  User.create({
    username: 'qiwi',
    first_name: 'Client',
    last_name: 'Admin',
    email: 'clientadmin@mail.com',
    password: hash,
    password_salt: salt,
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
  User.create({
    username: 'cabbage.orange',
    first_name: 'Client',
    last_name: 'User',
    email: 'clientuser@mail.com',
    password: hash,
    password_salt: salt,
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
}).catch((err) => {
  error('Unable to create table : ', err);
});

module.exports = User;
