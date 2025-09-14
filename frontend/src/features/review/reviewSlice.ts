import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { KanjiWord } from "./reviewTypes";
import api from "../../api/axios";

interface KanjiState {
  kanjis: KanjiWord[];
  loading: boolean;
  error: string | null;
}

const initialState: KanjiState = {
  kanjis: [],
  loading: false,
  error: null,
};

export const fetchKanji = createAsyncThunk("kanji/fetchKanji", async () => {
  const response = await api.get("/kanji");
  return response.data as KanjiWord[];
});

const kanjiSlice = createSlice({
  name: "kanji",
  initialState,
  reducers: {
    markKanjiLearning(state, action: PayloadAction<number>) {
      const k = state.kanjis.find((x) => x.id === action.payload);
      if (k) k.status = "learning";
    },
    markKanjiMastered(state, action: PayloadAction<number>) {
      const k = state.kanjis.find((x) => x.id === action.payload);
      if (k) k.status = "mastered";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanji.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKanji.fulfilled, (state, action) => {
        state.kanjis = action.payload;
        state.loading = false;
      })
      .addCase(fetchKanji.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch kanji";
        state.loading = false;
      });
  },
});

export const { markKanjiLearning, markKanjiMastered } = kanjiSlice.actions;
export default kanjiSlice.reducer;
