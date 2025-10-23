import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  role: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      },
      refreshToken: (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
      },
      logout: (state) => {
        state.accessToken = null;
        state.user = null;
        state.role = null;
      },
    },
  });

export const { login, refreshToken, logout } = userSlice.actions;
export default userSlice.reducer;
