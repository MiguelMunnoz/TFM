import { createSlice } from '@reduxjs/toolkit';

import {  } from '../services/api';

const initialState = {
  tasks: [],
  isModalVisible: false,
  visibleFields: ['title', 'status', ['date', 'time'], 'description', 'images'],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		/* Manejo del array de tareas */
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

		/*Manejo de la visibilidad del modal*/ 
		setModalVisibility: (state, action) => {
			state.isModalVisible = action.payload;
		},
		 
	}
});

export const { setTasks, addTask, removeTask, updateTask, clearTasks, setModalVisibility } = tasksSlice.actions;
export default tasksSlice.reducer;
