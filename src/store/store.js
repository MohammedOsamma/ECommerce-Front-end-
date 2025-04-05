/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./admin/products-slice/index";
import shopProductsSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import commonFeatureSlice from "./common-slice/index";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
