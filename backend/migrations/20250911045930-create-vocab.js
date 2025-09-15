'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vocab", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      kana: { type: Sequelize.STRING(255), allowNull: false },
      kanji: {type: Sequelize.STRING(255), allowNull: false},
      romaji: {type: Sequelize.STRING(255), allowNull: false},
      meaning: { type: Sequelize.STRING(255), allowNull: false },
      example: { type: Sequelize.TEXT },
      level: { type: Sequelize.STRING(10), allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("vocab");
  },
};
