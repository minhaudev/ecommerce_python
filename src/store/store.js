import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { cartItems } from "./slices/cartSlice";

const rootReducer = combineReducers({
  productSlice,
  cartItems,
});

export const store = configureStore({
  reducer: rootReducer,
});
