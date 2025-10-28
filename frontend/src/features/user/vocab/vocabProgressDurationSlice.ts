import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface VocabProgress {
  date: string;
  duration_seconds: number;
}

export const fetchVocabDurationProgress = createAsyncThunk(
  "vocabProgress/fetchVocabDurationProgress",
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
        duration_seconds: number;
      }>
    ) => {
      state.progress = state.progress.map((w) =>
        w.date === action.payload.date
          ? {
              ...w,
              duration_seconds:
                w.duration_seconds + action.payload.duration_seconds,
            }
          : w
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVocabDurationProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabDurationProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchVocabDurationProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil vocab";
      });
  },
});

export const { setProgress, markAsMastered } = vocabProgressSlice.actions;
export default vocabProgressSlice.reducer;
