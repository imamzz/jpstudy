import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { GrammarPoint } from "./grammarTypes";
import api from "../../api/axios";

interface GrammarState {
  points: GrammarPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: GrammarState = {
  points: [],
  loading: false,
  error: null,
};

export const fetchGrammar = createAsyncThunk("grammar/fetchGrammar", async () => {
  const response = await api.get("/grammar");
  return response.data as GrammarPoint[];
});

const grammarSlice = createSlice({
  name: "grammar",
  initialState,
  reducers: {
    markGrammarLearning(state, action: PayloadAction<number>) {
      const point = state.points.find((g) => g.id === action.payload);
      if (point) point.status = "learning";
    },
    markGrammarMastered(state, action: PayloadAction<number>) {
      const point = state.points.find((g) => g.id === action.payload);
      if (point) point.status = "mastered";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrammar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrammar.fulfilled, (state, action) => {
        state.points = action.payload;
        state.loading = false;
      })
      .addCase(fetchGrammar.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch grammar";
        state.loading = false;
      });
  },
});

export const { markGrammarLearning, markGrammarMastered } = grammarSlice.actions;
export default grammarSlice.reducer;
