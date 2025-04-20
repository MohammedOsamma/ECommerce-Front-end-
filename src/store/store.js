/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./admin/products-slice/index";
import adminOrderSlice from "./admin/order-slice/index";
import shopProductsSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice/index";
import shopOrderSlice from "./shop/order-slice/index";
import shopSeachrSlice from "./shop/search-slice/index";
import commonFeatureSlice from "./common-slice/index";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSeachrSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
