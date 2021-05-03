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
      // define association here
      Theater.belongsTo(models.RowID, {
        foreignKey: {
          allowNull: false,
          name: 'RowID'
        }
      })
    }
  };
  Theater.init({
    TheaterID:{
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
  },
    HallID: DataTypes.STRING,
    RowID: DataTypes.STRING,
    VipRowID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};