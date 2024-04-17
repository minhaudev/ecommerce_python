import { createSlice } from "@reduxjs/toolkit";
const initialStateProduct = {
  products: [],
  productDetails: {},
  productUpdate: {},
  productRated: [],
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
    updateProduct: (state, action) => {
      state.productUpdate = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      state.products = updatedProducts;
    },
    getProductRating: (state, action) => {
      state.productRated = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setProduct,
  setDetailsProduct,
  updateProduct,
  getProductRating,
} = productSlice.actions;
export default productSlice.reducer;
