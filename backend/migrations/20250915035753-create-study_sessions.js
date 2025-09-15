'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('study_sessions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      start_time: { type: Sequelize.DATE, allowNull: false },
      end_time: { type: Sequelize.DATE, allowNull: false },
      duration_seconds: { type: Sequelize.INTEGER, allowNull: false },
      activity_type: { type: Sequelize.ENUM('vocab', 'grammar', 'kanji', 'review'), allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('study_sessions');
  }
};
