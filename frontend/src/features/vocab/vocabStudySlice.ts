import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface Word {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status?: "new" | "learned" | "mastered";
}

export const fetchVocabStudy = createAsyncThunk(
  "vocabStudy/fetchVocabStudy",
  async (_, { getState }) => {
    const state: any = getState();
    const vocab = state.settings.vocab;

    const params = {
      words_per_set: vocab?.words_per_set ?? 10,
      level: vocab?.target_level ?? "N5",
    };

    const res = await privateApi.get("/vocab/study", { params });

    console.log("🚀 vocabStudy:", res.data);

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data.meta)) return res.data.meta;
    if (Array.isArray(res.data.meta?.words)) return res.data.meta.words;
    return [];
  }
);



const vocabStudySlice = createSlice({
  name: "vocabStudy",
  initialState: {
    studyWords: [] as Word[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setStudyWords: (state, action: PayloadAction<Word[]>) => {
      state.studyWords = action.payload;
    },
    markAsMastered: (state, action: PayloadAction<number>) => {
      state.studyWords = state.studyWords.map((w) =>
        w.id === action.payload ? { ...w, status: "mastered" } : w
      );
    },
    markAsLearned: (state, action: PayloadAction<number>) => {
      state.studyWords = state.studyWords.map((w) =>
        w.id === action.payload ? { ...w, status: "learned" } : w
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVocabStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.studyWords = action.payload;
      })
      .addCase(fetchVocabStudy.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil vocab";
      });
  },
});

export const { setStudyWords, markAsMastered, markAsLearned } = vocabStudySlice.actions;
export default vocabStudySlice.reducer;
