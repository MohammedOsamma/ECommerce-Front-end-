/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./admin/products-slice/index";
import shopProductsSlice from "./shop/products-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
