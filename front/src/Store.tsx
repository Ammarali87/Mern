import  { useReducer, createContext, PropsWithChildren, Dispatch } from 'react';
import { Cart, CartItem, ShippingAddress } from './types/Cart';
import { UserInfo } from './types/UserInfo';

// Utility function to safely get data from localStorage
const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Initial state
const initialState = {
  userInfo: getLocalStorage<UserInfo | null>('userInfo', null),
  mode: localStorage.getItem('mode') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  cart: {
    cartItems: getLocalStorage<CartItem[]>('cartItems', []),
    shippingAddress: getLocalStorage<ShippingAddress>('shippingAddress', {
      fullName: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
    }),
    paymentMethod: localStorage.getItem('paymentMethod') || 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type AppState = typeof initialState;

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode);
      return { ...state, mode: newMode };

    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const cartItems = state.cart.cartItems.some((item) => item._id === newItem._id)
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      localStorage.clear();
      return initialState;

    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };

    case 'SAVE_PAYMENT_METHOD':
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };

    default:
      return state;
  }
}

// Context creation
const Store = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Provider component
export function StoreProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}

export { Store };
