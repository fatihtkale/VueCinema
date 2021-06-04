'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    static associate(models) {
    }
  };
  tickets.init({
    ticketId: DataTypes.STRING,
    hallId: DataTypes.STRING,
    movieId: DataTypes.STRING,
    theaterId: DataTypes.STRING,
    rowId: DataTypes.STRING,
    seat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return tickets;
};