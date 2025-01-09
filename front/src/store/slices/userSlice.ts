import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: {
    id: string;
    name: string;
    email: string;
    token: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserState['userInfo']>) {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.error = null;
    },
    updateUser(state, action: PayloadAction<Partial<UserState['userInfo']>>) {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
