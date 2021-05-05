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
    rowId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    seat: {
      allowNull: false,
      type: DataTypes.STRING
    },
    availability: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'CommonRows',
  });
  return CommonRows;
};