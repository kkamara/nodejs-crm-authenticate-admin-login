const { DataTypes, } = require("sequelize");
const { log, error, } = require('console');
const sequelize = require('.');

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
   firstName: {
     type: DataTypes.STRING,
   },
   lastName: {
     type: DataTypes.STRING,
   },
   email: {
     type: DataTypes.STRING,
   },
   password: {
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
   },
   city: {
     type: DataTypes.STRING,
   },
   postcode: {
     type: DataTypes.STRING,
   },
   remember_token: {
     type: DataTypes.STRING,
   },
   created_at: {
     type: DataTypes.DATE,
   },
   updated_at: {
     type: DataTypes.DATE,
   },
   last_login: {
     type: DataTypes.DATE,
   },
   email_reset_key: {
     type: DataTypes.INTEGER,
   },
}, {
  indexes: [
    {
      unique: true,
      fields: ['user_created',],
    },
  ],
});

sequelize.sync().then(() => {
  log('User table created successfully!');
  User.create({
    username: 'tomato.pear',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@mail.com',
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
  User.create({
    username: 'qiwi',
    firstName: 'Client',
    lastName: 'Admin',
    email: 'clientadmin@mail.com',
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
  User.create({
    username: 'cabbage.orange',
    firstName: 'Client',
    lastName: 'User',
    email: 'clientuser@mail.com',
  })
  .then(() => { log('User created.'); })
  .catch(() => { log('Unable to create user.'); });
}).catch((err) => {
  error('Unable to create table : ', err);
});

module.exports = User;
