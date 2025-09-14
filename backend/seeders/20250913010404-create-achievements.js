"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("achievements", [
      {
        code: "STREAK_7_DAYS",
        title: "Streak 7 Hari",
        description: "Belajar selama 7 hari berturut-turut",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "MASTER_100_VOCAB",
        title: "Master 100 Kosakata",
        description: "Menguasai 100 kosakata",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "FIRST_GRAMMAR",
        title: "Grammar Pertama",
        description: "Mempelajari grammar pertama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "KANJI_SENSEI",
        title: "Kanji Sensei",
        description: "Menguasai 50 Kanji",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("achievements", null, {});
  },
};
