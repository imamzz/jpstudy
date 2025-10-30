import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface Grammar {
  id: number;
  pattern: string;
  kana: string;
  romaji: string;
  meaning: string;
  example_words: string[];
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status?: "new" | "learned" | "mastered";
}

export const fetchGrammarStudy = createAsyncThunk(
  "grammarStudy/fetchGrammarStudy",
  async (_, { getState }) => {
    const state: any = getState();
    const grammar = state.settings.grammar;

    const params = {
      grammar_per_set: grammar?.grammar_per_set ?? 10,
      level: grammar?.target_level ?? "N5",
    };

    const res = await privateApi.get("/grammar/study", { params });

    console.log("🚀 kanjiStudy:", res.data);

    return res.data.data;
  }
);



const grammarStudySlice = createSlice({
  name: "grammarStudy",
  initialState: {
    studyWords: [] as Grammar[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setStudyWords: (state, action: PayloadAction<Grammar[]>) => {
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
      .addCase(fetchGrammarStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrammarStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.studyWords = action.payload;
      })
      .addCase(fetchGrammarStudy.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil grammar";
      });
  },
});

export const { setStudyWords, markAsMastered, markAsLearned } = grammarStudySlice.actions;
export default grammarStudySlice.reducer;
