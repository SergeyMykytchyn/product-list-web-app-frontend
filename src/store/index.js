import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({ products: productsReducer });

export const store = configureStore({
  reducer: rootReducer,
});
