import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface KanjiProgress {
  date: string;
  item_count: number;
  learned_count: number;
  mastered_count: number;
}

export const fetchKanjiMasteredProgress = createAsyncThunk(
  "kanjiProgress/fetchKanjiMasteredProgress",
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
      .addCase(fetchKanjiMasteredProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKanjiMasteredProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchKanjiMasteredProgress.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil kanji";
      });
  },
});

export const { setProgress, markAsMastered } = kanjiProgressSlice.actions;
export default kanjiProgressSlice.reducer;
