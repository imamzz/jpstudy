import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface KanjiProgress {
  date: string;
  duration_seconds: number;
}

export const fetchKanjiDurationProgress = createAsyncThunk(
  "kanjiProgress/fetchDurationProgress",
  async (range: "week" | "month" | "year" = "week") => {
    const res = await privateApi.get("/study-session/kanji/3", {
      params: { range },
    });

    return res.data.data;
  }
);

const kanjiProgressSlice = createSlice({
  name: "kanjiProgress",
  initialState: {
    progress: [] as KanjiProgress[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProgress: (state, action: PayloadAction<KanjiProgress[]>) => {
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
      .addCase(fetchKanjiDurationProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKanjiDurationProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchKanjiDurationProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil kanji";
      });
  },
});

export const { setProgress, markAsMastered } = kanjiProgressSlice.actions;
export default kanjiProgressSlice.reducer;
