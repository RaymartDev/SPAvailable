/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserState from '../../interface/UserState';

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const initialState: UserState = {
  user: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : undefined,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem('userInfo');
    },
    verify: (state) => {
      if (state.user) {
        state.user.active = true;
      }
    },
  },
});

export default UserSlice.reducer;
export const { setCredentials, logout, verify } = UserSlice.actions;
