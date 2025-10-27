import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export type ReviewStatus = "learned" | "review" | "mastered";

export interface ReviewItem {
  id: number;
  item_id: number;
  item_type: string;
  status: ReviewStatus;
  masteredAt?: string;
  item_detail: any;
}

interface ReviewState {
  items: ReviewItem[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: ReviewState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export const fetchReview = createAsyncThunk(
  "review/fetchReview",
  async ({ page, pageSize, search, level }: { page: number; pageSize: number; search?: string; level?: string }) => {
    const res = await privateApi.get("/review", {
      params: { page, pageSize, search, level },
    });
    return res.data; // { success, message, data, meta }
  }
);

const reviewSlice = createSlice({
  name: "reviewTable",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ReviewItem[]>) => {
      state.items = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    markAsMastered: (state, action: PayloadAction<number>) => {
      const item = state.items.find((w) => w.id === action.payload);
      if (item) {
        item.status = "mastered";
        item.masteredAt = new Date().toISOString();
      }
    },
    markAsReview: (state, action: PayloadAction<number>) => {
      const item = state.items.find((w) => w.id === action.payload);  
      if (item) {
        item.status = "review";
        item.masteredAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.map((r: any) => ({
          id: r.id,
          item_id: r.item_id,
          item_type: r.item_type,
          status: r.status || null,   // default null = belum dipelajari
          masteredAt: r.mastered_at || null,
          item_detail: r.item_detail || null,
        }));
        state.total = action.payload.meta.total;
        state.page = action.payload.meta.page;
        state.pageSize = action.payload.meta.pageSize;
        state.totalPages = action.payload.meta.totalPages;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat review";
      });
  },
});

export const { setItems, setPage, setPageSize, markAsMastered, markAsReview } =
  reviewSlice.actions;
export default reviewSlice.reducer;
