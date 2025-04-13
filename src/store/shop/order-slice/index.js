import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  orderId: null,
  isLoading: false,
};

//add function to add new order
export const createNewOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/order/create`,
      orderData
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/createOrder",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/order/capture`,
      { paymentId, payerId, orderId }
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
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
