'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userlogin extends Model {
    static associate(models) {
      Userlogin.belongsTo(models.User, {
        foreignKey: {
            allowNull: false,
            name: 'userid'
        }
    })
    }
  };
  Userlogin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Userlogin',
  });
  return Userlogin;
};