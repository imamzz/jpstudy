import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface GrammarProgress {
  date: string;
  duration_seconds: number;
}

export const fetchGrammarDurationProgress = createAsyncThunk(
  "grammarProgress/fetchDurationProgress",
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
      .addCase(fetchGrammarDurationProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrammarDurationProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchGrammarDurationProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil grammar";
      });
  },
});

export const { setProgress, markAsMastered } = grammarProgressSlice.actions;
export default grammarProgressSlice.reducer;
