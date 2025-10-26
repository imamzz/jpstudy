import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export type KanjiStatus = "learned" | "review" | "mastered";

export interface Kanji {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: KanjiStatus;
  masteredAt?: string;
  example?: string;
  onyomi?: string;
  kunyomi?: string;
}

interface KanjiState {
  kanjis: Kanji[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: KanjiState = {
  kanjis: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export const fetchKanji = createAsyncThunk(
  "kanji/fetchKanji",
  async ({ page, pageSize, search, level }: { page: number; pageSize: number; search?: string; level?: string }) => {
    const res = await privateApi.get("/kanji", {
      params: { page, pageSize, search, level },
    });
    return res.data; // { success, message, data, meta }
  }
);

const kanjiSlice = createSlice({
  name: "kanji",
  initialState,
  reducers: {
    setKanjis: (state, action: PayloadAction<Kanji[]>) => {
      state.kanjis = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    markAsMastered: (state, action: PayloadAction<number>) => {
      const kanji = state.kanjis.find((k) => k.id === action.payload);
      if (kanji) {
        kanji.status = "mastered";
        kanji.masteredAt = new Date().toISOString();
      }
    },
    markAsReview: (state, action: PayloadAction<number>) => {
      const kanji = state.kanjis.find((k) => k.id === action.payload);  
      if (kanji) {
        kanji.status = "review";
        kanji.masteredAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanji.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKanji.fulfilled, (state, action) => {
        state.loading = false;
        state.kanjis = action.payload.data.map((k: any) => ({
          id: k.id,
          kanji: k.kanji,
          kana: k.kana,
          romaji: k.romaji,
          meaning: k.meaning,
          level: k.level,
          example: k.example,
          onyomi: k.onyomi,
          kunyomi: k.kunyomi,
          status: k.UserVocabProgress?.status || null,   // default null = belum dipelajari
          masteredAt: k.UserVocabProgress?.mastered_at || null,
        }));
        state.total = action.payload.meta.total;
        state.page = action.payload.meta.page;
        state.pageSize = action.payload.meta.pageSize;
        state.totalPages = action.payload.meta.totalPages;
      })
      .addCase(fetchKanji.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat kanji";
      });
  },
});

export const { setKanjis, setPage, setPageSize, markAsMastered, markAsReview } =
  kanjiSlice.actions;
export default kanjiSlice.reducer;
