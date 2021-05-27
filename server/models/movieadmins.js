'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovieAdmins extends Model {
        static associate(models) {
            MovieAdmins.belongsTo(models.Movies, {
              targetKey: 'movieId',
              foreignKey: {
                name:"movieId",
                field: 'movieId',
              }
            })
        }
    };
    MovieAdmins.init({
        movieId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        movieView: DataTypes.INTEGER,
        movieNextShow: DataTypes.DATE,
        movieProfit: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'MovieAdmins',
    });

    return MovieAdmins;
};