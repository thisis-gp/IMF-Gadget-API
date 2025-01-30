'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gadget', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
        defaultValue: "Available"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      decommisionedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gadget');
  }
};