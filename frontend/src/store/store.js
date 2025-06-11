import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/taskSlice';
import eventsReducer from '../slices/eventSlice';
import userReducer from '../slices/userSlice';
import loadingReducer from '../slices/loadingSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    events: eventsReducer,
    user: userReducer,
    loading: loadingReducer,
  },
});