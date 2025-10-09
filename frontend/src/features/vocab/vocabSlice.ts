// src/features/vocab/vocabSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export type WordStatus = "learned" | "review" | "mastered";

export interface Word {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: WordStatus;
  masteredAt?: string;
  example?: string;
}

interface VocabState {
  words: Word[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: VocabState = {
  words: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export const fetchVocab = createAsyncThunk(
  "vocab/fetchVocab",
  async ({ page, pageSize, search, level }: { page: number; pageSize: number; search?: string; level?: string }) => {
    const res = await privateApi.get("/vocab", {
      params: { page, pageSize, search, level },
    });
    return res.data; // { success, message, data, meta }
  }
);

const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
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
      .addCase(fetchVocab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocab.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload.data.map((v: any) => ({
          id: v.id,
          kanji: v.kanji,
          kana: v.kana,
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
      .addCase(fetchVocab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat kosakata";
      });
  },
});

export const { setWords, setPage, setPageSize, markAsMastered, markAsReview } =
  vocabSlice.actions;
export default vocabSlice.reducer;
