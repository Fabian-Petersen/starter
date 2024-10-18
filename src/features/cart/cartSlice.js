import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const proxyUrl = "https://api.allorigins.win/get?url=";
const url = "https://course-api.com/react-useReducer-cart-project";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    return fetch(proxyUrl + encodeURIComponent(url))
      .then((resp) => resp.json())
      .then((data) => JSON.parse(data.contents)) // The response will be wrapped in a 'contents' field
      .catch((err) => console.log(err));
  }
);

// Define the initial state
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

// Create a slice with the reducer to modify the state
// Use the useSelector hook to access the state in the components
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);

      // $ Empty the cart if the cartItems array is empty
      if (state.cartItems.length === 0) {
        state.amount = 0;
        state.total = 0;
      }
    },
    // $ The `action` is destructured already to give the payload
    increaseAmount: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = cartItem.amount + 1;
    },
    // $ The action is not desctructed to show the difference.
    decreaseAmount: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (cartItem.amount >= 1) {
        cartItem.amount = cartItem.amount - 1;
      }
    },
    totalCartItems: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.amount * item.price;
        amount += item.amount;
        state.amount = amount;
        state.total = total;
      });
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [fetchCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  totalCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
