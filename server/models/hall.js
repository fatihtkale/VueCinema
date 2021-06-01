'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    static associate(models) {
    }
  };
  Hall.init({
    hallId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER, 
      allowNull: true
    },
    availability: DataTypes.BOOLEAN,
    theaterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hall',
  });
  return Hall;
};