'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    Movies.init({
        movieId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movieTitle: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieDescription: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieRating: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        movieGenre: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieReleaseYear: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        movieBanner: {
            allowNull: true,
            type: DataTypes.STRING
        },
        movieAgeLimit: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        movieNextShow: {
            allowNull: false,
            type: DataTypes.DATE
        },
    }, {
        sequelize,
        modelName: 'Movies',
    });
    return Movies;
};