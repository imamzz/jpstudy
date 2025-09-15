"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("vocab", [
      // N5
      {
        kana: "犬",
        kanji: "犬",
        romaji: "inu",
        example: "犬が好きです。",
        meaning: "anjing",
        level: "N5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kana: "水",
        kanji: "水",
        romaji: "mizu",
        example: "水を飲みます。",
        meaning: "air",
        level: "N5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N4
      {
        kana: "卒業",
        kanji: "卒業",
        romaji: "sotsugyō",
        example: "大学を卒業しました。",
        meaning: "kelulusan",
        level: "N4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kana: "経験",
        kanji: "経験",
        romaji: "keiken",
        example: "仕事の経験があります。",
        meaning: "pengalaman",
        level: "N4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N3
      {
        kana: "影響",
        kanji: "影響",
        romaji: "eikyō",
        example: "彼の考えに影響を受けました。",
        meaning: "pengaruh",
        level: "N3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kana: "環境",
        kanji: "環境",
        romaji: "kankyō",
        example: "環境を守りましょう。",
        meaning: "lingkungan",
        level: "N3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N2
      {
        kana: "改善",
        kanji: "改善",
        romaji: "kaizen",
        example: "生活を改善したいです。",
        meaning: "perbaikan",
        level: "N2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kana: "尊重",
        kanji: "尊重",
        romaji: "sonchō",
        example: "意見を尊重するべきです。",
        meaning: "menghormati",
        level: "N2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N1
      {
        kana: "抽象",
        kanji: "抽象",
        romaji: "chūshō",
        example: "抽象的な概念を理解する。",
        meaning: "abstrak",
        level: "N1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kana: "矛盾",
        kanji: "矛盾",
        romaji: "mujun",
        example: "彼の話には矛盾がある。",
        meaning: "kontradiksi",
        level: "N1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("vocab", null, {});
  },
};
