import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  isModalVisible: false,
  visibleFields: ['title', 'status', ['date', 'time'], 'description', 'images'],
};

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		/* Manejo del array de tareas */
		setEvents: (state, action) => {
			state.events = action.payload;
		},
		addEvent: (state, action) => {
			state.events.push(action.payload);
		},
		removeEvent: (state, action) => {
			state.events = state.events.filter(event => event._id !== action.payload);
		},
		updateEvent: (state, action) => {
			const updatedEvent = action.payload;
			state.events = state.events.map(event =>
				event._id === updatedEvent._id ? updatedEvent : event
			);
		},
		clearEvents(state) {
			state.events = [];
		},

		/*Manejo de la visibilidad del modal*/ 
		setModalVisibility: (state, action) => {
			state.isModalVisible = action.payload;
		},
		 
	}
});

export const { setEvents, addEvent, removeEvent, updateEvent, clearEvents, setModalVisibility } = eventsSlice.actions;
export default eventsSlice.reducer;
