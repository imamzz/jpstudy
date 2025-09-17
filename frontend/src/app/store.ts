import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vocabReducer from "../features/vocab/vocabSlice";
import grammarReducer from "../features/grammar/grammarSlice";
import kanjiReducer from "../features/kanji/kanjiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vocab: vocabReducer,
    grammar: grammarReducer,
    kanji: kanjiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
