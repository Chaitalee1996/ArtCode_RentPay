import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  USER_ID: 118,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //Service
    __userIdChange(state, action) {
      state.USER_ID = action.payload;
    },
  },
});

export const {__userIdChange} = userSlice.actions;
export default userSlice.reducer;
