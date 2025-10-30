import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface ProgressSummary {
  level: string;
  vocab: { mastered: number; total: number };
  grammar: { mastered: number; total: number };
  kanji: { mastered: number; total: number };
}

export const fetchTarget = createAsyncThunk(
  "target/fetchProgressSummary",
  async () => {
    const level = "N5";
    const res = await privateApi.get("/progress/summary", { params: { level } });
    console.log("🚀 progressSummary:", res.data);
    return res.data.data as ProgressSummary;
  }
);

const targetSlice = createSlice({
  name: "target",
  initialState: {
    progress: null as ProgressSummary | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProgress: (state, action: PayloadAction<ProgressSummary>) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchTarget.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil progress summary";
      });
  },
});

export const { setProgress } = targetSlice.actions;
export default targetSlice.reducer;
