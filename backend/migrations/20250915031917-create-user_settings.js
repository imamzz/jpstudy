'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("user_settings", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      words_per_set: { type: Sequelize.INTEGER, allowNull: false },
      seconds_per_word: { type: Sequelize.INTEGER, allowNull: false },
      target_level: { type: Sequelize.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false },
      dark_mode: { type: Sequelize.BOOLEAN, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("user_settings");
  }
};
