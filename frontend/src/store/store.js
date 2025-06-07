import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/taskSlice';
import userReducer from '../slices/userSlice';
import loadingReducer from '../slices/loadingSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
    loading: loadingReducer,
  },
});