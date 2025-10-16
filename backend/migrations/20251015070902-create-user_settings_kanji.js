'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_settings_kanji', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      kanji_per_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      seconds_per_kanji: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      break_per_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 60 },
      total_set: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 3 },
      target_level: { type: Sequelize.ENUM('N5', 'N4', 'N3', 'N2', 'N1'), allowNull: false, defaultValue: 'N5' },
      focus_mode: { type: Sequelize.ENUM('arti', 'bacaan', 'campuran'), allowNull: false, defaultValue: 'campuran' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_settings_kanji');
  },
};
