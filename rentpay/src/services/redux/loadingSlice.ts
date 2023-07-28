import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LOADING: false,
  REFRESHING: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    //Service
    __loadingChange(state, action) {
      state.LOADING = action.payload;
    },
    __refreshingChange(state, action) {
      state.REFRESHING = action.payload;
    },
  },
});

export const {__loadingChange, __refreshingChange} = loadingSlice.actions;
export default loadingSlice.reducer;
