import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/Cart';

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existItem) {
        existItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
