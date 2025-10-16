export const defaultSettings = {
  vocab: {
    words_per_set: 10,
    seconds_per_word: 10,
    break_per_set: 60,
    total_set: 3,
    target_level: "N5" as const,
  },
  grammar: {
    total_question_per_set: 10,
    difficulty: "easy" as const,
    break_per_set: 60,
    target_level: "N5" as const,
  },
  kanji: {
    kanji_per_set: 10,
    seconds_per_kanji: 10,
    break_per_set: 60,
    total_set: 3,
    target_level: "N5" as const,
    focus_mode: "campuran" as const,
  },
  review: {
    review_days_range: 7,
    target_level: "N5" as const,
  },
};
