// src/features/vocab/vocabSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type WordStatus = "new" | "learning" | "mastered";

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

// 🔹 Async Thunk untuk fetch data vocab dari backend
export const fetchVocab = createAsyncThunk(
  "vocab/fetchVocab",
  async ({ page, pageSize, search, level }: { page: number; pageSize: number; search?: string; level?: string }) => {
    const res = await axios.get("http://localhost:5000/api/vocab", {
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
    markAsLearned: (state, action: PayloadAction<number>) => {
      const word = state.words.find((w) => w.id === action.payload);
      if (word) {
        word.status = "mastered";
        word.masteredAt = new Date().toISOString();
      }
    },
    markAsLearning: (state, action: PayloadAction<number>) => {
      const word = state.words.find((w) => w.id === action.payload);  
      if (word) {
        word.status = "learning";
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
        state.words = action.payload.data;   // ✅ langsung array
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

export const { setWords, setPage, setPageSize, markAsLearned, markAsLearning } =
  vocabSlice.actions;
export default vocabSlice.reducer;
