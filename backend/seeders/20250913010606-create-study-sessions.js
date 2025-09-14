"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // ambil semua user dari tabel users
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users;`
    );

    if (users.length > 0) {
      const now = new Date();
      const sessions = [];

      users.forEach((u) => {
        // buat 7 hari terakhir, tiap hari 1 sesi belajar
        for (let i = 0; i < 7; i++) {
          const start = new Date(now);
          start.setDate(start.getDate() - i);
          start.setHours(19, 0, 0, 0); // jam 7 malam

          const end = new Date(start);
          end.setMinutes(end.getMinutes() + 30); // durasi 30 menit

          sessions.push({
            user_id: u.id,
            start_time: start,
            end_time: end,
            duration_seconds: 1800,
            activity_type: ["vocab", "grammar", "kanji", "review"][
              Math.floor(Math.random() * 4)
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      await queryInterface.bulkInsert("study_sessions", sessions, {});
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("study_sessions", null, {});
  },
};
