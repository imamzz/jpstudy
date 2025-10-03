// src/features/review/reviewSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export type ReviewType = "vocab" | "grammar" | "kanji";

export interface ReviewItem {
  id: number;
  type: ReviewType;
  content: string;        // kata / grammar / kanji
  meaning: string;
  examples?: string[];
  masteredAt: string;     // timestamp dari slice masing-masing
}

interface ReviewState {
  items: ReviewItem[];
}

const initialState: ReviewState = {
  items: [],
};

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
    clearReview: (state) => {
      state.items = [];
    },
  },
});

// ✅ Selector untuk ambil item mastered ≤ 7 hari lalu
export const selectRecentReviews = (state: RootState): ReviewItem[] => {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const allItems: ReviewItem[] = [];

  // 🔹 Ambil vocab
  state.vocab.words.forEach((w) => {
    if (w.status === "mastered" && w.masteredAt) {
      const masteredDate = new Date(w.masteredAt);
      if (masteredDate >= sevenDaysAgo) {
        allItems.push({
          id: w.id,
          type: "vocab",
          content: w.kanji || w.kana,
          meaning: w.meaning,
          examples: [],
          masteredAt: w.masteredAt,
        });
      }
    }
  });

  // 🔹 Ambil grammar
  state.grammar.points.forEach((g) => {
    if (g.status === "mastered" && g.masteredAt) {
      const masteredDate = new Date(g.masteredAt);
      if (masteredDate >= sevenDaysAgo) {
        allItems.push({
          id: g.id,
          type: "grammar",
          content: g.title,
          meaning: g.meaning,
          examples: g.examples,
          masteredAt: g.masteredAt,
        });
      }
    }
  });

  // 🔹 Ambil kanji
  state.kanji.items.forEach((k) => {
    if (k.status === "mastered" && k.masteredAt) {
      const masteredDate = new Date(k.masteredAt);
      if (masteredDate >= sevenDaysAgo) {
        allItems.push({
          id: k.id,
          type: "kanji",
          content: k.kanji,
          meaning: k.meaning,
          examples: k.examples,
          masteredAt: k.masteredAt,
        });
      }
    }
  });

  // Urutkan terbaru dulu
  return allItems.sort(
    (a, b) => new Date(b.masteredAt).getTime() - new Date(a.masteredAt).getTime()
  );
};

export const { setReviewItems, markReviewed, clearReview } = reviewSlice.actions;
export default reviewSlice.reducer;
