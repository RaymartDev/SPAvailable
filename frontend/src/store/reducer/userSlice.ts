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
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    logout: (state, _action) => {
      state.user = initialState.user;
    },
    verify: (state, action) => {
      if (state.user) {
        state.user.active = action.payload.active;
      }
    },
  },
});

export default UserSlice.reducer;
export const { login, logout, verify } = UserSlice.actions;
