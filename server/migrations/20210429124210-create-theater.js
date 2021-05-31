'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Theaters', {
      theaterId:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      rowQty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vipRowQty: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Theaters');
  }
};