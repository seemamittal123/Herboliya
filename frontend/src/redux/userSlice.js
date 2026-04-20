import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  loading: true,
  cartItem: [],
  totalAmount: 0,
  myOrder: [],
  likedItems: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.loading = false;
      state.cartItem = [];
      state.totalAmount = 0;
      state.likedItems = [];
      state.myOrder = [];
    },
    startAuthCheck: (state) => {
      state.loading = true;
    },

    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existItem = state.cartItem.find(
        (item) => item._id === cartItem._id,
      );
      if (existItem) {
        existItem.quantity += cartItem.quantity;
      } else {
        state.cartItem.push(cartItem);
      }
      state.totalAmount = state.cartItem.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItem.find((i) => i._id == _id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = state.cartItem.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },

    deleteCart: (state, action) => {
      const deleteItem = action.payload;
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== deleteItem._id,
      );
      state.totalAmount = state.cartItem.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },

    setMyOrders: (state, action) => {
      state.myOrder = action.payload;
    },

    addMyOrder: (state, action) => {
      state.myOrder = [action.payload, ...state.myOrder];
    },
    
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.myOrder.find((o) => o._id == orderId);
      if (order) {
        order.status = status;
      }
    },

    setLikes: (state, action) => {
      state.likedItems = action.payload;
    },
    addLikedItem: (state, action) => {
      const exists = state.likedItems.some((item) => item._id === action.payload._id);
      if (!exists) {
        state.likedItems = [action.payload, ...state.likedItems];
      }
    },
    removeLikedItem: (state, action) => {
      state.likedItems = state.likedItems.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const {
  setUser,
  clearUser,
  startAuthCheck,
  addToCart,
  deleteCart,
  updateQuantity,
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  setLikes,
  addLikedItem,
  removeLikedItem,
} = userSlice.actions;

export default userSlice.reducer;
