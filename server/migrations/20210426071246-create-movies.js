'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
            movieId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            movieTitle: {
                allowNull: false,
                type: Sequelize.STRING
            },
            movieDescription: {
                allowNull: false,
                type: Sequelize.STRING
            },
            movieRating: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            movieGenre: {
                allowNull: false,
                type: Sequelize.STRING
            },
            movieReleaseYear: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            movieBanner: {
                allowNull: true,
                type: Sequelize.STRING
            },
            movieAgeLimit: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            movieNextShow: {
                allowNull: false,
                type: Sequelize.DATE
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