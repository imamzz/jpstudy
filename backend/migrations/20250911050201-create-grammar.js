'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("grammar", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      level: { type: Sequelize.STRING(10), allowNull: false },
      pattern: { type: Sequelize.STRING(255), allowNull: false },
      meaning: { type: Sequelize.TEXT, allowNull: false },
      example: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("grammar");
  },
};
