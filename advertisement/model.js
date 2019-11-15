const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');

const Advertisement = db.define('ad', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Advertisement.belongsTo(User);

module.exports = Advertisement;
