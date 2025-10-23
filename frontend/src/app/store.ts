import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vocabReducer from "../features/vocab/vocabSlice";
import vocabStudyReducer from "../features/vocab/vocabStudySlice";
import grammarReducer from "../features/grammar/grammarSlice";
import kanjiReducer from "../features/kanji/kanjiSlice";
import reviewReducer from "../features/review/reviewSlice";
import configReducer from "../features/config/configSlice";
import settingsReducer from "../features/settings/settingsSlice"
import progressSummaryReducer from "../features/home/progressSummarySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vocab: vocabReducer,
    vocabStudy: vocabStudyReducer,
    grammar: grammarReducer,
    kanji: kanjiReducer,
    review: reviewReducer,
    config: configReducer,
    settings: settingsReducer,
    progressSummary: progressSummaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
