'use strict';

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("kanji", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      kanji: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      meaning: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      example_words: {
        type: Sequelize.TEXT,
      },
      kana: {
        type: Sequelize.STRING(255),
      },
      romaji: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("kanji");
  },
};
