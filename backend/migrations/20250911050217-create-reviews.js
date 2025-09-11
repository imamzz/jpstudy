'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      item_type: { type: Sequelize.STRING(50), allowNull: false }, // vocab, grammar, kanji
      item_id: { type: Sequelize.INTEGER, allowNull: false },
      review_date: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      next_review: { type: Sequelize.DATE },
      attempt_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      correct: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("reviews");
  },
};
