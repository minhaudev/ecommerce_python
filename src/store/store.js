import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: ["orderPay", "orderDelivered"],
};

const rootReducer = combineReducers({
  products: productSlice,
  cart: cartSlice,
  users: userSlice,
  orders: orderSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Tạo persistor để sử dụng với PersistGate
export let persistor = persistStore(store);
