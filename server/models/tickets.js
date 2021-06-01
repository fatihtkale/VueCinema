'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    modelName: 'tickets',
  });
  return tickets;
};