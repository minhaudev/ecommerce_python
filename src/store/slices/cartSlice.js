import { createSlice } from "@reduxjs/toolkit";

const initialStateCartItems = {
  cartItems: [],
  shipping: {},
  paymentMethod: {},
};

export const cartItems = createSlice({
  name: "cartItems",
  initialState: initialStateCartItems,
  reducers: {
    cartAddItem: (state, action) => {
      const { id, qty, pDetails } = action.payload;

      const { _id, name, image, price, countInStock } = pDetails;

      const existItemIndex = state.cartItems.findIndex(
        (x) => x.product === Number(id)
      );
      if (existItemIndex !== -1) {
        // Nếu mục đã tồn tại, thay thế số lượng của nó bằng qty mới
        state.cartItems[existItemIndex].qty = parseInt(qty, 10);
      } else {
        // Nếu mục không tồn tại, thêm vào giỏ hàng
        state.cartItems.push({
          product: _id,
          name,
          image,
          price,
          countInStock,
          qty: parseInt(qty, 10),
        });
      }
    },
    cartRemoveItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productIdToRemove
      );
    },
    saveShippingAddress: (state, action) => {
      state.shipping = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    removeItemsOrdered: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const {
  cartAddItem,
  cartRemoveItem,
  saveShippingAddress,
  savePaymentMethod,
  removeItemsOrdered,
} = cartItems.actions;
export default cartItems.reducer;
