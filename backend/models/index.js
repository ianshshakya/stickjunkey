const { Sequelize } = require('sequelize');
const UserModel = require('./User');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Initialize the model
const User = UserModel.initModel(sequelize);

module.exports = {
  sequelize,
  User,
};

