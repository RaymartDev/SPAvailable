import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SpaState from '../../interface/SpaState';

const initialState: SpaState[] = [];

export const SpaSlice = createSlice({
  name: 'spa',
  initialState,
  reducers: {
    createSpa: (state: SpaState[], action: PayloadAction<SpaState>) => {
      if (action.payload) {
        return [action.payload, ...state];
      }
      return state;
    },
    updateSpa: (state: SpaState[], action: PayloadAction<SpaState>) => {
      const updatedSpa = action.payload;
      const index = state.findIndex((spa) => spa?.id === updatedSpa?.id);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = updatedSpa;
        return newState;
      }
      return state;
    },
    deleteSpa: (state: SpaState[], action: PayloadAction<SpaState>) => {
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
    setSpa: (_state: SpaState[], action: PayloadAction<SpaState[]>) => {
      return action.payload;
    },
  },
});

export const { createSpa, setSpa, updateSpa, deleteSpa } = SpaSlice.actions;

export default SpaSlice.reducer;
