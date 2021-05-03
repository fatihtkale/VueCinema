'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommonRows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CommonRows.init({
    rowID: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
  },
    seat: {
      allowNull: false,
      type: DataTypes.INTEGER
  },
    Availability: {
      allowNull: false,
      type: DataTypes.INTEGER
  }
  }, {
    sequelize,
    modelName: 'CommonRows',
  });
  return CommonRows;
};