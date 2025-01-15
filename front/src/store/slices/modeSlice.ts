import { createSlice } from "@reduxjs/toolkit";

export  type ModeState = 'light' | 'dark';

const initialState: ModeState = 
  (localStorage.getItem('mode') as ModeState) || 'light';

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      const newMode = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', newMode);
      return newMode;
    }
  }
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;