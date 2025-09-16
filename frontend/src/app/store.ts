import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vocabReducer from "../features/vocab/vocabSlice";
import grammarReducer from "../features/grammar/grammarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vocab: vocabReducer,
    grammar: grammarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
