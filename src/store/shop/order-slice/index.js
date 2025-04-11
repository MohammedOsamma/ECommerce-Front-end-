import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approveURL: null,
  orderId: null,
  isLoading: false,
};

export const createNewOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    const response = await axios.post(
      "hhtp://localhost:5000/api/shop/order/create",
      orderData
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoopingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approveURL = action.payload.approveURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approveURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
