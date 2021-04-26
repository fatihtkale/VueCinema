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
        movieRating: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieGenre: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieDescription: {
            allowNull: false,
            type: DataTypes.STRING
        },
        movieTime: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Movies',
    });
    return Movies;
};