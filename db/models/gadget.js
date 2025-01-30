'use strict';
const {
  Model,
  Sequelize,
  UUIDV4
} = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('Gadget', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: UUIDV4,
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
}, {
  freezeTableName: true,
  modelName: 'Gadget',
});