'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_settings_grammar', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      total_question_per_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      seconds_per_question: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      total_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 3 },
      difficulty: { type: Sequelize.ENUM('easy', 'medium', 'hard'), allowNull: false, defaultValue: 'easy' },
      break_per_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 60 },
      target_level: { type: Sequelize.ENUM('N5', 'N4', 'N3', 'N2', 'N1'), allowNull: false, defaultValue: 'N5' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_settings_grammar');
  },
};
