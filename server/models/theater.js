'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Theater.belongsTo(models.CommonRows, {
        foreignKey: {
          name: 'rowId',
          allowNull: false
        }
      })
      
      Theater.belongsTo(models.VipRows, {
        foreignKey: {
          name: 'vipRowId',
          allowNull: false
        }
      })
      
      Theater.belongsTo(models.Hall,{
        foreignKey: {
          name: 'hallId',
          allowNull: false
        }
      })
    }
  };
  Theater.init({
    theaterId:{
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};