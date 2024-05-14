import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserState from '../../interface/UserState';

const initialState: UserState[] = [];

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state: UserState[], action: PayloadAction<UserState>) => {
      if (action.payload) {
        return [action.payload, ...state];
      }
      return state;
    },
    updateUser: (state: UserState[], action: PayloadAction<UserState>) => {
      const updatedUser = action.payload;
      const index = state.findIndex((spa) => spa?.id === updatedUser?.id);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = { ...newState[index], ...updatedUser };
        return newState;
      }
      return state;
    },
    deleteUser: (state: UserState[], action: PayloadAction<UserState>) => {
      const indexToDelete = state.findIndex(
        (spa) => spa?.id === action.payload?.id
      );
      if (indexToDelete !== -1) {
        const newState = [...state];
        newState.splice(indexToDelete, 1); // Remove the spa at the found index
        return newState;
      }
      return state;
    },
    setUsers: (_state: UserState[], action: PayloadAction<UserState[]>) => {
      return action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearUsers: (_state: UserState[]) => {
      return initialState;
    },
  },
});

export const { addUser, setUsers, updateUser, deleteUser, clearUsers } =
  UsersSlice.actions;

export default UsersSlice.reducer;
