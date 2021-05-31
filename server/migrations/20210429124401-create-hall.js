'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Halls', {
      hallId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      qty: Sequelize.INTEGER,
      availability: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Halls');
  }
};