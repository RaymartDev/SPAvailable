/* eslint-disable @typescript-eslint/no-unused-vars */
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
    setCredentials: (state: UserState, action: PayloadAction<UserState>) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };
    },
    logout: (state) => {
      localStorage.removeItem('userInfo');
      return {
        ...state,
        user: undefined,
      };
    },
    verify: (state: UserState) => {
      if (state.user) {
        const newUser = {
          ...state.user,
          active: true,
        };
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        return {
          ...state,
          user: newUser,
        };
      }
      return state; // Return the original state if no user is found
    },
    updateInfo: (state: UserState, action) => {
      if (state.user) {
        const newUser = {
          ...state.user,
          ...action.payload,
        };
        if (newUser.password) {
          delete newUser.password;
        }
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        return {
          ...state,
          user: newUser,
        };
      }
      return state;
    },
  },
});

export default UserSlice.reducer;
export const { setCredentials, logout, verify, updateInfo } = UserSlice.actions;
