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
import reviewTableReducer from "../features/user/review/reviewTableSlice";
import vocabProgressDurationReducer from "../features/user/vocab/vocabProgressDurationSlice";
import vocabProgressMasteredReducer from "../features/user/vocab/vocabProgressMasteredSlice";

export const store = configureStore({
  reducer: {
    // vocab
    vocab: vocabReducer,
    vocabProgressDuration: vocabProgressDurationReducer,
    vocabProgressMastered: vocabProgressMasteredReducer,
    vocabStudy: vocabStudyReducer,


    // review
    review: reviewReducer,
    reviewTable: reviewTableReducer,


    // kanji
    kanji: kanjiReducer,


    // grammar
    grammar: grammarReducer,


    // user
    user: userReducer,


    // setting
    settings: settingsReducer,
    config: configReducer,

    
    // progress summary
    progressSummary: progressSummaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
