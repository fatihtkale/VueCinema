'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Movies');
    }
};