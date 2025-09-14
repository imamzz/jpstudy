"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // ambil semua user dari tabel users
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users;`
    );

    if (users.length > 0) {
      const settings = users.map((u) => ({
        user_id: u.id,
        words_per_set: 5,
        seconds_per_word: 10,
        target_level: "N5",
        dark_mode: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("user_settings", settings, {});
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_settings", null, {});
  },
};
