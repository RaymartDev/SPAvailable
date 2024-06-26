import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserSlice } from './reducer/userSlice';
import { SpaSlice } from './reducer/spaSlice';
import { UsersSlice } from './reducer/usersSlice';
import { FeedbackSlice } from './reducer/feedbackSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    spa: SpaSlice.reducer,
    users: UsersSlice.reducer,
    feedback: FeedbackSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
