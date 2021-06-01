'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    static associate(models) {
      Theater.belongsTo(models.Hall, {
        foreignKey: 'hallId'
      })
    }
  };
  Theater.init({
    theaterId:{
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    rowQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vipRowQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hallId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};