import { createSlice } from '@reduxjs/toolkit';

import {  } from '../services/api';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    clearTasks(state) {
      state.tasks = [];
    },
  }
});

export const { setTasks, addTask, removeTask, updateTask, clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
