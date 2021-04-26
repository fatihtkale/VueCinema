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
                    name: 'MoviesId'
                }
            })
        }
    };
    MovieAdmins.init({
        AdminId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        movieProfit: DataTypes.STRING,
        lastShow: DataTypes.STRING,
        nextShow: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'MovieAdmins',
    });

    return MovieAdmins;
};