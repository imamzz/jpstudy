// src/features/kanji/kanjiSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type KanjiStatus = "new" | "learning" | "mastered";

export interface Kanji {
  id: number;
  kanji: string;
  onyomi?: string[];   // contoh: ["ニチ","ジツ"]
  kunyomi?: string[];  // contoh: ["ひ", "か"]
  meaning: string;
  examples?: string[]; // contoh kata/kalimat
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: KanjiStatus;
  masteredAt?: string;
}

interface KanjiState {
  items: Kanji[];
}

const initialState: KanjiState = {
  items: [
    {
      id: 1,
      kanji: "日",
      onyomi: ["ニチ", "ジツ"],
      kunyomi: ["ひ", "か"],
      meaning: "hari / matahari",
      examples: ["日本 (にほん) - Jepang", "休日 (きゅうじつ) - hari libur"],
      level: "N5",
      status: "new",
    },
    {
      id: 2,
      kanji: "人",
      onyomi: ["ジン", "ニン"],
      kunyomi: ["ひと"],
      meaning: "orang",
      examples: ["日本人 (にほんじん) - orang Jepang", "人々 (ひとびと) - orang-orang"],
      level: "N5",
      status: "new",
    },
    {
      id: 3,
      kanji: "大",
      onyomi: ["ダイ", "タイ"],
      kunyomi: ["おお(きい)"],
      meaning: "besar",
      examples: ["大学 (だいがく) - universitas", "大きい (おおきい) - besar"],
      level: "N5",
      status: "new",
    },
    {
      id: 4,
      kanji: "学",
      onyomi: ["ガク"],
      kunyomi: ["まな(ぶ)"],
      meaning: "belajar, ilmu",
      examples: ["学生 (がくせい) - pelajar", "学校 (がっこう) - sekolah"],
      level: "N5",
      status: "new",
    },
    {
      id: 5,
      kanji: "行",
      onyomi: ["コウ", "ギョウ"],
      kunyomi: ["い(く)", "ゆ(く)"],
      meaning: "pergi",
      examples: ["行く (いく) - pergi", "銀行 (ぎんこう) - bank"],
      level: "N5",
      status: "new",
    },
    // tambahkan entri lainnya sesuai kebutuhan...
  ],
};

const kanjiSlice = createSlice({
  name: "kanji",
  initialState,
  reducers: {
    setKanji: (state, action: PayloadAction<Kanji[]>) => {
      state.items = action.payload;
    },
    markKanjiLearning: (state, action: PayloadAction<number>) => {
      const k = state.items.find((it) => it.id === action.payload);
      if (k) {
        k.status = "learning";
        k.masteredAt = new Date().toISOString();
      }
    },
    markKanjiMastered: (state, action: PayloadAction<number>) => {
      const k = state.items.find((it) => it.id === action.payload);
      if (k) {
        k.status = "mastered";
        k.masteredAt = new Date().toISOString();
      }
    },
    updateKanji: (state, action: PayloadAction<{ id: number; patch: Partial<Kanji> }>) => {
      const { id, patch } = action.payload;
      const idx = state.items.findIndex((it) => it.id === id);
      if (idx >= 0) {
        state.items[idx] = { ...state.items[idx], ...patch };
      }
    },
    resetKanjiState: (state) => {
      state.items = initialState.items;
    },
  },
});

export const {
  setKanji,
  markKanjiLearning,
  markKanjiMastered,
  updateKanji,
  resetKanjiState,
} = kanjiSlice.actions;

export default kanjiSlice.reducer;
