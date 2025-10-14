// src/features/review/reviewSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import privateApi from "@/base/privateApi";

export type ReviewType = "vocab" | "grammar" | "kanji";

export interface ReviewItem {
  id: number;
  item_id: number;
  type: ReviewType;
  content: string;
  meaning: string;
  correct: boolean;
  examples?: string[];
  masteredAt?: string;
}

export interface ReviewResult {
  id: number;
  item_id: number;
  type: ReviewType;
  correct: boolean;
  reviewedAt: string;
}

interface ReviewMeta {
  total: number;
  reviewedToday: number;
  progress: number;
}

interface ReviewState {
  items: ReviewItem[];
  results: ReviewResult[];
  meta: ReviewMeta | null;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  lastSync: string | null;
}

const initialState: ReviewState = {
  items: [],
  results: [],
  meta: null,
  loading: false,
  syncing: false,
  error: null,
  lastSync: null,
};

// ==============================
// 🔹 Ambil data review dari backend
// ==============================
export const fetchReviewStudy = createAsyncThunk(
  "review/fetchStudy",
  async (
    { days = 7, type = "vocab" }: { days?: number; type?: ReviewType },
    { rejectWithValue }
  ) => {
    try {
      const res = await privateApi.get("/review/study", { params: { days, type } });
      if (!res.data || !res.data.data) throw new Error(res.data.message || "Data kosong");
      return {
        data: res.data.data, // array review
        meta: res.data.meta || { total: 0, reviewedToday: 0, progress: 0 },
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==============================
// 🔹 Simpan batch hasil review
// ==============================
export const submitReviewBatch = createAsyncThunk(
  "review/submitBatch",
  async (results: ReviewResult[], { rejectWithValue }) => {
    try {
      const res = await privateApi.post("/review/submit-batch", { reviews: results });
      if (!res.data.success) throw new Error(res.data.message);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviewItems: (state, action: PayloadAction<ReviewItem[]>) => {
      state.items = action.payload;
    },
    markReviewed: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    addResult: (
      state,
      action: PayloadAction<{
        id: number;
        item_id: number;
        type: ReviewType;
        correct: boolean;
      }>
    ) => {
      state.results.push({
        id: action.payload.id,
        item_id: action.payload.item_id,
        type: action.payload.type,
        correct: action.payload.correct,
        reviewedAt: new Date().toISOString(),
      });
    },
    clearReview: (state) => {
      state.items = [];
      state.results = [];
      state.meta = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH STUDY ===
      .addCase(fetchReviewStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewStudy.fulfilled, (state, action) => {
        state.loading = false;

        // simpan meta
        state.meta = action.payload.meta;

        // map hasil data
        state.items = action.payload.data
          .map((item: any) => {
            if (item.item_type === "vocab" && item.vocab) {
              return {
                id: item.id,
                item_id: item.item_id,
                type: "vocab" as ReviewType,
                content: item.vocab.kanji || item.vocab.kana,
                correct: item.correct ?? false,
                meaning: item.vocab.meaning,
                masteredAt: item.review_date,
              };
            }
            if (item.item_type === "kanji" && item.kanji) {
              return {
                id: item.id,
                item_id: item.item_id,
                type: "kanji" as ReviewType,
                content: item.kanji.kanji,
                correct: item.correct ?? false,
                meaning: item.kanji.meaning,
                masteredAt: item.review_date,
              };
            }
            if (item.item_type === "grammar" && item.grammar) {
              return {
                id: item.id,
                item_id: item.item_id,
                type: "grammar" as ReviewType,
                content: item.grammar.pattern || item.grammar.title,
                correct: item.correct ?? false,
                meaning: item.grammar.meaning,
                masteredAt: item.review_date,
              };
            }
            return null;
          })
          .filter(Boolean) as ReviewItem[];
      })
      .addCase(fetchReviewStudy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Gagal memuat data review";
      })

      // === SUBMIT BATCH ===
      .addCase(submitReviewBatch.pending, (state) => {
        state.syncing = true;
      })
      .addCase(submitReviewBatch.fulfilled, (state, action) => {
        state.syncing = false;
        state.lastSync = new Date().toISOString();

        // ✅ Tandai item yang sudah direview sebagai benar
        const reviewedIds = action.meta.arg.map((r: any) => r.id);
        state.items = state.items.map((item) =>
          reviewedIds.includes(item.id) ? { ...item, correct: true } : item
        );

        state.results = [];
      })
      .addCase(submitReviewBatch.rejected, (state, action) => {
        state.syncing = false;
        state.error = (action.payload as string) || "Gagal menyimpan hasil review";
      });
  },
});

export const { setReviewItems, markReviewed, clearReview, addResult } =
  reviewSlice.actions;

export const selectAllReviews = (state: RootState): ReviewItem[] => state.review.items;
export const selectReviewMeta = (state: RootState): ReviewMeta | null => state.review.meta;
export const selectReviewLoading = (state: RootState): boolean => state.review.loading;
export const selectReviewError = (state: RootState): string | null => state.review.error;
export const selectPendingResults = (state: RootState): ReviewResult[] =>
  state.review.results;
export const selectLastSync = (state: RootState): string | null => state.review.lastSync;

export default reviewSlice.reducer;
