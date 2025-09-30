import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WordStatus = "new" | "learning" | "mastered";

export interface Word {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  arti: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: WordStatus;
  masteredAt?: string;
}

interface VocabState {
  words: Word[];
}

const initialState: VocabState = {
  words: [
    {
      id: 1,
      kanji: "猫",
      kana: "ねこ",
      romaji: "neko",
      arti: "kucing",
      level: "N5",
      status: "new",
    },
    {
      id: 2,
      kanji: "水",
      kana: "みず",
      romaji: "mizu",
      arti: "air",
      level: "N5",
      status: "new",
    },
    {
      id: 3,
      kanji: "学校",
      kana: "がっこう",
      romaji: "gakkou",
      arti: "sekolah",
      level: "N4",
      status: "new",
    },
    {
      id: 4,
      kanji: "経済",
      kana: "けいざい",
      romaji: "keizai",
      arti: "ekonomi",
      level: "N3",
      status: "new",
    },
    {
      id: 5,
      kanji: "議論",
      kana: "ぎろん",
      romaji: "giron",
      arti: "diskusi",
      level: "N2",
      status: "new",
    },
    {
      id: 6,
      kanji: "憲法",
      kana: "けんぽう",
      romaji: "kenpou",
      arti: "konstitusi",
      level: "N1",
      status: "new",
    },
    {
      id: 7,
      kanji: "花",
      kana: "はな",
      romaji: "hana",
      arti: "bungan",
      level: "N5",
      status: "new",
    },
    {
      id: 8,
      kanji: "雨",
      kana: "あめ",
      romaji: "ame",
      arti: "hujan",
      level: "N5",
      status: "new",
    },
    {
      id: 9,
      kanji: "風",
      kana: "かぜ",
      romaji: "kaze",
      arti: "angin",
      level: "N5",
      status: "new",
    },
    {
      id: 10,
      kanji: "山",
      kana: "やま",
      romaji: "yama",
      arti: "gunung",
      level: "N5",
      status: "new",
    },
    {
      id: 11,
      kanji: "川",
      kana: "かわ",
      romaji: "kawa",
      arti: "sungai",
      level: "N5",
      status: "new",
    },
    {
      id: 12,
      kanji: "日",
      kana: "にち",
      romaji: "nichi",
      arti: "hari",
      level: "N5",
      status: "new",
    },
    {
      id: 13,
      kanji: "月",
      kana: "つき",
      romaji: "tsuki",
      arti: "bulan",
      level: "N5",
      status: "new",
    },
    {
      id: 14,
      kanji: "火",
      kana: "ひ",
      romaji: "hi",
      arti: "api",
      level: "N5",
      status: "new",
    },
    {
      id: 15,
      kanji: "土",
      kana: "つち",
      romaji: "tsuchi",
      arti: "tanah",
      level: "N5",
      status: "new",
    },
  ],
};

const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    markAsLearned: (state, action: PayloadAction<number>) => {
      const word = state.words.find(w => w.id === action.payload);
      if (word) {
        word.status = "mastered";
        word.masteredAt = new Date().toISOString();
      }
    },
    markAsLearning: (state, action: PayloadAction<number>) => {
      const word = state.words.find(w => w.id === action.payload);
      if (word) {
        word.status = "learning";
        word.masteredAt = new Date().toISOString();
      }
    },
  },
});

export const { setWords, markAsLearned, markAsLearning } = vocabSlice.actions;
export default vocabSlice.reducer;
