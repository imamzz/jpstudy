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
import grammarProgressDurationReducer from "../features/user/grammar/grammarProgressDurationSlice";
import grammarProgressMasteredReducer from "../features/user/grammar/grammarProgressMasteredSlice";
import kanjiProgressDurationReducer from "../features/user/kanji/kanjiProgressDurationSlice";
import kanjiProgressMasteredReducer from "../features/user/kanji/kanjiProgressMasteredSlice";
import targetReducer from "../features/user/home/targetSlice";

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
    kanjiProgressDuration: kanjiProgressDurationReducer,
    kanjiProgressMastered: kanjiProgressMasteredReducer,


    // grammar
    grammar: grammarReducer,
    grammarProgressDuration: grammarProgressDurationReducer,
    grammarProgressMastered: grammarProgressMasteredReducer,


    // user
    user: userReducer,


    // setting
    settings: settingsReducer,
    config: configReducer,

    
    // progress summary
    progressSummary: progressSummaryReducer,

    // target
    target: targetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
