import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// Define the initial state
const initialState = {
  items: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

// Create a slice with the reducer to modify the state
// Use the useSelector hook to access the state in the components
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
