import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface GrammarProgress {
  date: string;
  item_count: number;
  learned_count: number;
  mastered_count: number;
}

export const fetchGrammarMasteredProgress = createAsyncThunk(
  "grammarProgress/fetchGrammarMasteredProgress",
  async (range: "week" | "month" | "year" = "week") => {
    const res = await privateApi.get("/study-session/grammar/3", {
      params: { range },
    });

    return res.data.data;
  }
);

const grammarProgressSlice = createSlice({
  name: "grammarProgress",
  initialState: {
    progress: [] as GrammarProgress[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProgress: (state, action: PayloadAction<GrammarProgress[]>) => {
      state.progress = action.payload;
    },
    markAsMastered: (
      state,
      action: PayloadAction<{
        date: string;
        item_count: number;
        learned_count: number;
        mastered_count: number;
      }>
    ) => {
      state.progress = state.progress.map((w) =>
        w.date === action.payload.date
          ? {
              ...w,
              item_count: w.item_count + action.payload.item_count,
              learned_count: w.learned_count + action.payload.learned_count,
              mastered_count: w.mastered_count + action.payload.mastered_count,
            }
          : w
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrammarMasteredProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrammarMasteredProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchGrammarMasteredProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil grammar";
      });
  },
});

export const { setProgress, markAsMastered } = grammarProgressSlice.actions;
export default grammarProgressSlice.reducer;
