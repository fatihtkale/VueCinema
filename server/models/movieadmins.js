'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovieAdmins extends Model {
        static associate(models) {
            MovieAdmins.belongsTo(models.Movies, {
                foreignKey: {
                    allowNull: false,
                    name: 'moviesId'
                }
            })
        }
    };
    MovieAdmins.init({
        adminId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        movieView: DataTypes.INTEGER,
        movieLastShow: DataTypes.DATE,
        movieNextShow: DataTypes.DATE,
        movieProfit: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'MovieAdmins',
    });

    return MovieAdmins;
};