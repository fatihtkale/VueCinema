'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userlogin extends Model {
    static associate(models) {
    }
  };
  Userlogin.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Userlogin',
  });
  return Userlogin;
};