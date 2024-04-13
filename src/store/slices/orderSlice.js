import { createSlice } from "@reduxjs/toolkit";
const initialStateOrder = {
  orderItem: {},
  detailsOrder: {},
  orderPay: {},
  orderDelivered: {},
};
export const orderSlice = createSlice({
  name: "orders",
  initialState: initialStateOrder,
  reducers: {
    createOrder: (state, action) => {
      state.orderItem = action.payload;
    },
    getDetailsOrder: (state, action) => {
      console.log("action", action.payload);
      state.detailsOrder = action.payload;
    },
    updatePay: (state, action) => {
      state.orderPay = action.payload;
    },
    updateOrderDelivered: (state, action) => {
      state.orderDelivered = action.payload;
    },
  },
});

export const { createOrder, getDetailsOrder, updatePay, updateOrderDelivered } =
  orderSlice.actions;
export default orderSlice.reducer;
