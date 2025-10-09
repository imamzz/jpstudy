import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vocabReducer from "../features/vocab/vocabSlice";
import vocabStudyReducer from "../features/vocab/vocabStudySlice";
import grammarReducer from "../features/grammar/grammarSlice";
import kanjiReducer from "../features/kanji/kanjiSlice";
import reviewReducer from "../features/review/reviewSlice";
import configReducer from "../features/config/configSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vocab: vocabReducer,
    vocabStudy: vocabStudyReducer,
    grammar: grammarReducer,
    kanji: kanjiReducer,
    review: reviewReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
