import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;




// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserInfo } from '../../types/UserInfo';

//   // state value to one item = localStorage
// const initialState: UserInfo | null
//  = JSON.parse(localStorage.getItem('userInfo') || 'null');

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     signIn: (_, action: PayloadAction<UserInfo>) => {
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       return action.payload;
//     },
//     signOut: () => {
//       localStorage.removeItem('userInfo');
//       localStorage.clear();
//       return null;
//     },
//   },
// });

// export const { signIn, signOut } = userSlice.actions;
// export default userSlice.reducer;
