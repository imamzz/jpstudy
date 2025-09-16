import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vocabReducer from "../features/vocab/vocabSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vocab: vocabReducer, // <── daftarin vocab reducer di sini
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
