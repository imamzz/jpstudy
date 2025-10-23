import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type GrammarStatus = "new" | "learning" | "mastered";

export interface GrammarPoint {
  id: number;
  title: string;       // bentuk grammar, contoh: 〜ている
  meaning: string;     // arti singkat
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  examples: string[];  // contoh kalimat
  status: GrammarStatus;
  masteredAt?: string;
}

interface GrammarState {
  points: GrammarPoint[];
}

const initialState: GrammarState = {
  points: [
    {
      id: 1,
      title: "〜ている",
      meaning: "sedang melakukan",
      level: "N5",
      examples: ["私は本を読んでいる。"],
      status: "new",
    },
    {
      id: 2,
      title: "〜たい",
      meaning: "ingin melakukan",
      level: "N5",
      examples: ["日本へ行きたい。"],
      status: "new",
    },
    {
      id: 3,
      title: "〜なければならない",
      meaning: "harus",
      level: "N4",
      examples: ["勉強しなければならない。"],
      status: "new",
    },
  ],
};

const grammarSlice = createSlice({
  name: "grammar",
  initialState,
  reducers: {
    setGrammar: (state, action: PayloadAction<GrammarPoint[]>) => {
      state.points = action.payload;
    },
    markGrammarLearning: (state, action: PayloadAction<number>) => {
      const gp = state.points.find((g) => g.id === action.payload);
      if (gp) {
        gp.status = "learning";
        gp.masteredAt = new Date().toISOString();
      }
    },
    markGrammarMastered: (state, action: PayloadAction<number>) => {
      const gp = state.points.find((g) => g.id === action.payload);
      if (gp) {
        gp.status = "mastered";
        gp.masteredAt = new Date().toISOString();
      }
    },
  },
});

export const { setGrammar, markGrammarLearning, markGrammarMastered } =
  grammarSlice.actions;
export default grammarSlice.reducer;
