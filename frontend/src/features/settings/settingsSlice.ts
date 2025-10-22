import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";
import { AxiosError } from "axios";

export interface ReviewSetting {
  review_days_range: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
}

export interface VocabSetting {
  words_per_set: number;
  seconds_per_word: number;
  break_per_set: number;
  total_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
}

export interface GrammarSetting {
  total_question_per_set: number;
  difficulty: "easy" | "medium" | "hard";
  break_per_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
}

export interface KanjiSetting {
  kanji_per_set: number;
  seconds_per_kanji: number;
  break_per_set: number;
  total_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
  focus_mode: string;
}

interface SettingsState {
  vocab: VocabSetting | null;
  grammar: GrammarSetting | null;
  kanji: KanjiSetting | null;
  review: ReviewSetting | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  vocab: null,
  grammar: null,
  kanji: null,
  review: null,
  loading: false,
  error: null,
};

// =========================
// 🔹 Async Thunks
// =========================
export const fetchReviewSetting = createAsyncThunk(
  "settings/fetchReview",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await privateApi.get(`/setting/review/${userId}`);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveReviewSetting = createAsyncThunk(
  "settings/saveReview",
  async (
    { userId, data }: { userId: number; data: Partial<ReviewSetting> },
    { rejectWithValue }
  ) => {
    try {
      const res = await privateApi.put(`/setting/review/${userId}`, data);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 🔹 FETCH / SAVE VOCAB
// ==============================
export const fetchVocabSetting = createAsyncThunk(
  "settings/fetchVocab",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await privateApi.get(`/setting/vocab/${userId}`);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveVocabSetting = createAsyncThunk(
  "settings/saveVocab",
  async (
    { userId, data }: { userId: number; data: Partial<VocabSetting> },
    { rejectWithValue }
  ) => {
    try {
      const res = await privateApi.put(`/setting/vocab/${userId}`, data);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 🔹 FETCH / SAVE GRAMMAR
// ==============================
export const fetchGrammarSetting = createAsyncThunk(
  "settings/fetchGrammar",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await privateApi.get(`/setting/grammar/${userId}`);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveGrammarSetting = createAsyncThunk(
  "settings/saveGrammar",
  async (
    { userId, data }: { userId: number; data: Partial<GrammarSetting> },
    { rejectWithValue }
  ) => {
    try {
      const res = await privateApi.put(`/setting/grammar/${userId}`, data);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 🔹 FETCH / SAVE KANJI
// ==============================
export const fetchKanjiSetting = createAsyncThunk(
  "settings/fetchKanji",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await privateApi.get(`/setting/kanji/${userId}`);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveKanjiSetting = createAsyncThunk(
  "settings/saveKanji",
  async (
    { userId, data }: { userId: number; data: Partial<KanjiSetting> },
    { rejectWithValue }
  ) => {
    try {
      const res = await privateApi.put(`/setting/kanji/${userId}`, data);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =========================
// 🔹 Slice
// =========================
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // === FETCH REVIEW ===
      .addCase(fetchReviewSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchReviewSetting.fulfilled,
        (state, action: PayloadAction<ReviewSetting>) => {
          state.loading = false;
          state.review = action.payload;
        }
      )
      .addCase(fetchReviewSetting.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Gagal memuat setting review";
      })

      // === SAVE REVIEW ===
      .addCase(saveReviewSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        saveReviewSetting.fulfilled,
        (state, action: PayloadAction<ReviewSetting>) => {
          state.loading = false;
          state.review = action.payload;
        }
      )
      .addCase(saveReviewSetting.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Gagal menyimpan setting review";
      })

      // === FETCH VOCAB ===
      .addCase(fetchVocabSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchVocabSetting.fulfilled,
        (state, action: PayloadAction<VocabSetting>) => {
          state.loading = false;
          state.vocab = action.payload;
        }
      )
      .addCase(fetchVocabSetting.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Gagal memuat setting vocab";
      })

      // === SAVE VOCAB ===
      .addCase(
        saveVocabSetting.fulfilled,
        (state, action: PayloadAction<VocabSetting>) => {
          state.vocab = action.payload;
        }
      )

      // === FETCH GRAMMAR ===
      .addCase(
        fetchGrammarSetting.fulfilled,
        (state, action: PayloadAction<GrammarSetting>) => {
          state.grammar = action.payload;
        }
      )

      // === SAVE GRAMMAR ===
      .addCase(
        saveGrammarSetting.fulfilled,
        (state, action: PayloadAction<GrammarSetting>) => {
          state.grammar = action.payload;
        }
      )

      // === FETCH KANJI ===
      .addCase(
        fetchKanjiSetting.fulfilled,
        (state, action: PayloadAction<KanjiSetting>) => {
          state.kanji = action.payload;
        }
      )

      // === SAVE KANJI ===
      .addCase(
        saveKanjiSetting.fulfilled,
        (state, action: PayloadAction<KanjiSetting>) => {
          state.kanji = action.payload;
        }
      );
  },
});

export default settingsSlice.reducer;
