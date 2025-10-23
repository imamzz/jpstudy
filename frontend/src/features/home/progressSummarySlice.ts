import privateApi from "@/base/privateApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface ProgressSummary {
  vocab: { mastered: number; total: number };
  grammar: { mastered: number; total: number };
  kanji: { mastered: number; total: number };
}

interface ProgressSummaryState {
  progressSummary: ProgressSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressSummaryState = {
  progressSummary: null,
  loading: false,
  error: null,
};

export const fetchProgressSummary = createAsyncThunk(
  "progressSummary/fetchProgressSummary",
  async () => {
    const res = await privateApi.get("/progress/summary");
    return res.data;
  }
);


const progressSummarySlice = createSlice({
  name: "progressSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgressSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.progressSummary = action.payload.data;
      })
      .addCase(fetchProgressSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch progress summary";
      });
  },
});

export default progressSummarySlice.reducer;
