import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import FeedbackState from '../../interface/FeedbackState';

const initialState: FeedbackState[] = [];

export const FeedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    addFeedback: (
      state: FeedbackState[],
      action: PayloadAction<FeedbackState>
    ) => {
      if (action.payload) {
        return [action.payload, ...state];
      }
      return state;
    },
    deleteFeedback: (
      state: FeedbackState[],
      action: PayloadAction<FeedbackState>
    ) => {
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
    setFeedbacks: (
      _state: FeedbackState[],
      action: PayloadAction<FeedbackState[]>
    ) => {
      return action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearFeedbacks: (_state: FeedbackState[]) => {
      return initialState;
    },
  },
});

export const { addFeedback, setFeedbacks, deleteFeedback, clearFeedbacks } =
  FeedbackSlice.actions;

export default FeedbackSlice.reducer;
