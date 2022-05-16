import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.sort((a, b) => a.name.localeCompare(b.name));
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload].sort((a, b) => a.name.localeCompare(b.name));
    },
    removeProduct: (state, action) => {
      state.products = [...state.products.filter(item => item.id !== action.payload)];
    }
  },
});

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
