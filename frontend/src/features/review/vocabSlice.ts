// src/features/vocab/vocabSlice.ts
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
  masteredAt?: string; // ⬅️ tanggal saat di-mastered
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
    // ...
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
      const word = state.words.find((w) => w.id === action.payload);
      if (word) {
        word.status = "mastered";
        word.masteredAt = new Date().toISOString(); // ⬅️ simpan waktu
      }
    },
    markAsLearning: (state, action: PayloadAction<number>) => {
      const word = state.words.find((w) => w.id === action.payload);
      if (word) {
        word.status = "learning";
      }
    },
  },
});

export const { setWords, markAsLearned, markAsLearning } = vocabSlice.actions;
export default vocabSlice.reducer;
