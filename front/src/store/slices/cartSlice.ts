import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, ShippingAddress } from '../../types/Cart';

// Helper function to get data from localStorage
const getLocalStorage = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
  // state value to one item = localStorage

const initialState: Cart = {
  cartItems: getLocalStorage('cartItems', []),
  shippingAddress: getLocalStorage('shippingAddress', {}),
  paymentMethod: localStorage.getItem('paymentMethod') || 'PayPal',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(item => item._id === newItem._id);

      state.cartItems = existItem
        ? state.cartItems.map(item => (item._id === existItem._id ? newItem : item))
        : [...state.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: state => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', state.paymentMethod);
    },
  },
});

export const { addItem, removeItem, clearCart, saveShippingAddress, savePaymentMethod } =
  cartSlice.actions;
export default cartSlice.reducer;
