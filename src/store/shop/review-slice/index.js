import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk("order/addReview", async (data) => {
  const result = await axios.post(`http://localhost:5000/api/shop/review/add`, {
    data,
  });
  return result?.data;
});

export const getReviews = createAsyncThunk("order/getReviews", async (id) => {
  const result = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
  return result?.data;
});

createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});
