import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export type WordStatus = "learned" | "review" | "mastered";

export interface Grammar {
  id: number;
  pattern: string;
  romaji: string;
  meaning: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: WordStatus;
  masteredAt?: string;
  example?: string;
}

interface GrammarState {
  words: Grammar[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: GrammarState = {
  words: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export const fetchGrammar = createAsyncThunk(
  "grammar/fetchGrammar",
  async ({ page, pageSize, search, level }: { page: number; pageSize: number; search?: string; level?: string }) => {
    const res = await privateApi.get("/grammar", {
      params: { page, pageSize, search, level },
    });
    return res.data; // { success, message, data, meta }
  }
);

const grammarSlice = createSlice({
  name: "grammar",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Grammar[]>) => {
      state.words = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    markAsMastered: (state, action: PayloadAction<number>) => {
      const word = state.words.find((w) => w.id === action.payload);
      if (word) {
        word.status = "mastered";
        word.masteredAt = new Date().toISOString();
      }
    },
    markAsReview: (state, action: PayloadAction<number>) => {
      const word = state.words.find((w) => w.id === action.payload);  
      if (word) {
        word.status = "review";
        word.masteredAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrammar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrammar.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload.data.map((v: any) => ({
          id: v.id,
          pattern: v.pattern,
          romaji: v.romaji,
          meaning: v.meaning,
          level: v.level,
          example: v.example,
          status: v.UserVocabProgress?.status || null,   // default null = belum dipelajari
          masteredAt: v.UserVocabProgress?.mastered_at || null,
        }));
        state.total = action.payload.meta.total;
        state.page = action.payload.meta.page;
        state.pageSize = action.payload.meta.pageSize;
        state.totalPages = action.payload.meta.totalPages;
      })
      .addCase(fetchGrammar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat kosakata";
      });
  },
});

export const { setWords, setPage, setPageSize, markAsMastered, markAsReview } =
  grammarSlice.actions;
export default grammarSlice.reducer;
