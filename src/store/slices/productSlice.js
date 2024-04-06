import { createSlice } from "@reduxjs/toolkit";
const initialStateProduct = {
  products: [],
  productDetails: {},
};
export const productSlice = createSlice({
  name: "products",
  initialState: initialStateProduct,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },

    setDetailsProduct: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setProduct, setDetailsProduct } = productSlice.actions;
export default productSlice.reducer;
