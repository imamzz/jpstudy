'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_kanji_progress", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      kanji_id: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM("learned", "review", "mastered"), allowNull: false },
      last_studied: { type: Sequelize.DATE, allowNull: false },
      times_reviewed: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("user_kanji_progress");
  },
};
