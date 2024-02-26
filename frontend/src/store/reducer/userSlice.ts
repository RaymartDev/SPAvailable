/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserState from '../../interface/UserState';

const userInfoFromLocalStorage: string | null =
  localStorage.getItem('userInfo');
const initialState: UserState = userInfoFromLocalStorage
  ? JSON.parse(userInfoFromLocalStorage)
  : {};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserState>) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (_state) => {
      localStorage.removeItem('userInfo');
      return undefined;
    },
    verify: (state) => {
      if (state) {
        const newUser = {
          ...state,
          active: true,
        };
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        return newUser;
      }
      return state; // Return the original state if no user is found
    },
    updateInfo: (state, action) => {
      if (state) {
        const newUser = {
          ...state,
          ...action.payload,
        };
        if (newUser.password) {
          delete newUser.password;
        }
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        return newUser;
      }
      return state;
    },
  },
});

export default UserSlice.reducer;
export const { setCredentials, logout, verify, updateInfo } = UserSlice.actions;
