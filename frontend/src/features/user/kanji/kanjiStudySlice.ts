import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export interface Kanji {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  example_words: string[];
  onyomi: string[];
  kunyomi: string[];
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status?: "new" | "learned" | "mastered";
}

export const fetchKanjiStudy = createAsyncThunk(
  "kanjiStudy/fetchKanjiStudy",
  async (_, { getState }) => {
    const state: any = getState();
    const kanji = state.settings.kanji;

    const params = {
      kanji_per_set: kanji?.kanji_per_set ?? 10,
      level: kanji?.target_level ?? "N5",
    };

    const res = await privateApi.get("/kanji/study", { params });

    console.log("🚀 kanjiStudy:", res.data);

    return res.data.data;
  }
);



const kanjiStudySlice = createSlice({
  name: "kanjiStudy",
  initialState: {
    studyWords: [] as Kanji[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setStudyWords: (state, action: PayloadAction<Kanji[]>) => {
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
      .addCase(fetchKanjiStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKanjiStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.studyWords = action.payload;
      })
      .addCase(fetchKanjiStudy.rejected, (state) => {
        state.loading = false;
        state.error = "Gagal mengambil kanji";
      });
  },
});

export const { setStudyWords, markAsMastered, markAsLearned } = kanjiStudySlice.actions;
export default kanjiStudySlice.reducer;
