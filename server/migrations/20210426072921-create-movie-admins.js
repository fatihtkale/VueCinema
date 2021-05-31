'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('MovieAdmins', {
            movieId: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            movieView: Sequelize.INTEGER,
            movieNextShow: Sequelize.DATE,
            movieProfit: Sequelize.INTEGER,
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
        await queryInterface.dropTable('MovieAdmins');
    }
};