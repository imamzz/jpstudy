"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("kanji", [
      // N5
      {
        level: "N5",
        kanji: "日",
        meaning: "matahari / hari",
        example_words: "日本 (Nihon), 日曜日 (Nichiyoubi)",
        word: "日",
        romaji: "hi / nichi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N5",
        kanji: "人",
        meaning: "orang",
        example_words: "日本人 (Nihonjin), 三人 (sannin)",
        word: "人",
        romaji: "hito / jin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N4
      {
        level: "N4",
        kanji: "英",
        meaning: "Inggris",
        example_words: "英語 (Eigo), 英国 (Eikoku)",
        word: "英",
        romaji: "ei",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N4",
        kanji: "旅",
        meaning: "perjalanan",
        example_words: "旅行 (ryokou), 旅人 (tabibito)",
        word: "旅",
        romaji: "tabi / ryo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N3
      {
        level: "N3",
        kanji: "際",
        meaning: "kesempatan / saat",
        example_words: "国際 (kokusai), 実際 (jissai)",
        word: "際",
        romaji: "sai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N3",
        kanji: "確",
        meaning: "kepastian",
        example_words: "確認 (kakunin), 確実 (kakujitsu)",
        word: "確",
        romaji: "kaku",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N2
      {
        level: "N2",
        kanji: "縮",
        meaning: "menyusut",
        example_words: "短縮 (tanshuku), 縮小 (shukushou)",
        word: "縮",
        romaji: "chijimu / shuku",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N2",
        kanji: "徴",
        meaning: "tanda",
        example_words: "特徴 (tokuchou), 象徴 (shouchou)",
        word: "徴",
        romaji: "chou",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N1
      {
        level: "N1",
        kanji: "曖",
        meaning: "kabur / samar",
        example_words: "曖昧 (aimai)",
        word: "曖",
        romaji: "ai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N1",
        kanji: "璧",
        meaning: "permata / dinding",
        example_words: "完璧 (kanpeki)",
        word: "璧",
        romaji: "heki",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("kanji", null, {});
  },
};
