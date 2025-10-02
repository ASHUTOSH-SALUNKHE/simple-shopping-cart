import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartReducer.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
