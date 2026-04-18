import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: true,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    updateItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    removeLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setItems, updateItems, removeLoading } = shopSlice.actions;
export default shopSlice.reducer;
