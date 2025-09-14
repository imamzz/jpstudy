"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("grammar", [
      // N5
      {
        level: "N5",
        pattern: "〜は〜です",
        meaning: "menyatakan sesuatu",
        example: "私は学生です。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N5",
        pattern: "〜をください",
        meaning: "meminta sesuatu",
        example: "水をください。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N4
      {
        level: "N4",
        pattern: "〜なければならない",
        meaning: "harus",
        example: "宿題をしなければならない。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N4",
        pattern: "〜ようにする",
        meaning: "berusaha untuk",
        example: "毎日運動するようにしています。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N3
      {
        level: "N3",
        pattern: "〜わけではない",
        meaning: "bukan berarti",
        example: "高い料理が必ずおいしいわけではない。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N3",
        pattern: "〜とは限らない",
        meaning: "tidak selalu",
        example: "勉強ができる人が成功するとは限らない。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N2
      {
        level: "N2",
        pattern: "〜ざるを得ない",
        meaning: "terpaksa",
        example: "行かざるを得ない状況だ。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N2",
        pattern: "〜に越したことはない",
        meaning: "lebih baik",
        example: "健康はお金より大事に越したことはない。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // N1
      {
        level: "N1",
        pattern: "〜を余儀なくされる",
        meaning: "terpaksa melakukan",
        example: "会社は閉鎖を余儀なくされた。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        level: "N1",
        pattern: "〜んばかりに",
        meaning: "seakan-akan",
        example: "彼は倒れんばかりに走った。",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("grammar", null, {});
  },
};
