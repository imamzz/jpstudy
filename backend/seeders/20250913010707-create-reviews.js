"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // ambil semua user dari tabel users
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users;`
    );

    // ambil beberapa vocab, grammar, dan kanji
    const [vocab] = await queryInterface.sequelize.query(
      `SELECT id FROM vocab LIMIT 5;`
    );
    const [grammar] = await queryInterface.sequelize.query(
      `SELECT id FROM grammar LIMIT 5;`
    );
    const [kanji] = await queryInterface.sequelize.query(
      `SELECT id FROM kanji LIMIT 5;`
    );

    const reviews = [];
    const now = new Date();

    users.forEach((u) => {
      vocab.forEach((v) => {
        reviews.push({
          user_id: u.id,
          item_type: "vocab",
          item_id: v.id,
          first_review_date: new Date(now),
          last_review_date: new Date(now.getTime() + 24 * 60 * 60 * 1000), // +1 hari
          attempt_count: 1,
          correct: Math.random() > 0.3, // 70% benar
          ease_factor: 2.5,
          interval_days: 1,
          repetition_count: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      grammar.forEach((g) => {
        reviews.push({
          user_id: u.id,
          item_type: "grammar",
          item_id: g.id,
          first_review_date: new Date(now),
          last_review_date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 hari
          attempt_count: 2,
          correct: Math.random() > 0.4,
          ease_factor: 2.4,
          interval_days: 3,
          repetition_count: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      kanji.forEach((k) => {
        reviews.push({
          user_id: u.id,
          item_type: "kanji",
          item_id: k.id,
          first_review_date: new Date(now),
          last_review_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 hari
          attempt_count: 3,
          correct: Math.random() > 0.5,
          ease_factor: 2.3,
          interval_days: 7,
          repetition_count: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    if (reviews.length > 0) {
      await queryInterface.bulkInsert("reviews", reviews, {});
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("reviews", null, {});
  },
};
