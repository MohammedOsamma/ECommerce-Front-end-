import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ordersList: [],
  orderDetails: null,
};

export const getAllOrderForAdmin = createAsyncThunk(
  "/order/getAllOrderForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload.data;
      })
      .addCase(getAllOrderForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.ordersList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default adminOrderSlice.reducer;
