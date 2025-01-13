import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../types/UserInfo';
  // state value to one item = localStorage
const initialState: UserInfo | null
 = JSON.parse(localStorage.getItem('userInfo') || 'null');

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (_, action: PayloadAction<UserInfo>) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return action.payload;
    },
    signOut: () => {
      localStorage.removeItem('userInfo');
      localStorage.clear();
      return null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
