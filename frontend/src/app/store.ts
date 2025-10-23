import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profile/userSlice";
import vocabReducer from "../features/user/vocab/vocabSlice";
import vocabStudyReducer from "../features/user/vocab/vocabStudySlice";
import grammarReducer from "../features/user/grammar/grammarSlice";
import kanjiReducer from "../features/user/kanji/kanjiSlice";
import reviewReducer from "../features/user/review/reviewSlice";
import configReducer from "../features/config/configSlice";
import settingsReducer from "../features/user/settings/settingsSlice"
import progressSummaryReducer from "../features/user/home/progressSummarySlice";

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
