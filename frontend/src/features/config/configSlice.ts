// src/features/config/configSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Config {
  targetLevel: string;
  limit: number;
  totalSets: number;
  duration: number;
  breakDuration: number;
}

export const initialState: { config: Config; loading: boolean; error: string | null } = {
  config: {
    targetLevel: "N5",
    limit: 10,
    totalSets: 2,
    duration: 10,
    breakDuration: 30,
  },
  loading: false,
  error: null,
};

export const fetchUserConfig = createAsyncThunk<Config, number>(
  "config/fetchUserConfig",
  async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user-settings/${userId}`);
      const setting = res.data.data.userSetting;

      return {
        targetLevel: setting.target_level,
        limit: setting.words_per_set,
        totalSets: setting.total_set,
        duration: setting.seconds_per_word,
        breakDuration: setting.break_per_set,
      };
    } catch (error) {
      console.error("Gagal mengambil user config:", error);
      throw error;
    }
  }
);

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Config>) => {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchUserConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat konfigurasi user";
      });
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
