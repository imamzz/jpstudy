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
}

interface VocabState {
  words: Word[];
}

const initialState: VocabState = {
  words: [
    { id: 1, kanji: "猫", kana: "ねこ", romaji: "neko", arti: "kucing", level: "N5", status: "new" },
    { id: 2, kanji: "水", kana: "みず", romaji: "mizu", arti: "air", level: "N5", status: "new" },
    { id: 3, kanji: "学校", kana: "がっこう", romaji: "gakkou", arti: "sekolah", level: "N4", status: "new" },
    { id: 4, kanji: "経済", kana: "けいざい", romaji: "keizai", arti: "ekonomi", level: "N3", status: "new" },
    { id: 5, kanji: "議論", kana: "ぎろん", romaji: "giron", arti: "diskusi", level: "N2", status: "new" },
    { id: 6, kanji: "憲法", kana: "けんぽう", romaji: "kenpou", arti: "konstitusi", level: "N1", status: "new" },
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
      }
    },
    markAsLearning: (state, action: PayloadAction<number>) => {
      const word = state.words.find(w => w.id === action.payload);
      if (word) {
        word.status = "learning";
      }
    },
  },
});

export const { setWords, markAsLearned, markAsLearning } = vocabSlice.actions;
export default vocabSlice.reducer;
