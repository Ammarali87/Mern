import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'),
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
      localStorage.setItem('token', action.payload.token);
    },
    userInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  }
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
