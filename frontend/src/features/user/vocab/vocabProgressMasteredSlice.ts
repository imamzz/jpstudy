import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface VocabProgress {
  date: string;
  item_count: number;
  learned_count: number;
  mastered_count: number;
}

export const fetchVocabMasteredProgress = createAsyncThunk(
  "vocabProgress/fetchVocabMasteredProgress",
  async (range: "week" | "month" | "year" = "week") => {
    const res = await privateApi.get("/study-session/vocab/3", {
      params: { range },
    });

    return res.data.data;
  }
);

const vocabProgressSlice = createSlice({
  name: "vocabProgress",
  initialState: {
    progress: [] as VocabProgress[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProgress: (state, action: PayloadAction<VocabProgress[]>) => {
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
      .addCase(fetchVocabMasteredProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabMasteredProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchVocabMasteredProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil vocab";
      });
  },
});

export const { setProgress, markAsMastered } = vocabProgressSlice.actions;
export default vocabProgressSlice.reducer;
