import { createAsyncThunk } from "@reduxjs/toolkit";
import privateApi from "@/base/privateApi";

export const fetchReviewStudy = createAsyncThunk(
  "review/fetchStudy",
  async ({ days = 7, type = "vocab" }: { days?: number; type?: string }) => {
    const res = await privateApi.get("/review/study", {
      params: { days, type },
    });
    return res.data.data; // ambil langsung array data dari respons
  }
);
