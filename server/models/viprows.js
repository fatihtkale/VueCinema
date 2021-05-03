'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VipRows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VipRows.init({
    vipRowID: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
  },
    seat: DataTypes.STRING,
    Availability: DataTypes.STRINGs
  }, {
    sequelize,
    modelName: 'VipRows',
  });
  return VipRows;
};