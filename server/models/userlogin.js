'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userlogin extends Model {
    static associate(models) {
      Userlogin.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: 'userid'
        }
    })
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
    }
  }, {
    sequelize,
    modelName: 'Userlogin',
  });
  return Userlogin;
};