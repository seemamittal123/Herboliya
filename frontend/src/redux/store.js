import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import shopSlice from "./shopSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopSlice,
  },
});
