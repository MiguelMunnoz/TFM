import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  isModalVisible: false,
  visibleFields: ['title', 'status', ['date', 'time'], ['country', 'city'], 'details'],
};

const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
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

		setEventModalVisibility: (state, action) => {
			state.isModalVisible = action.payload;
		},
		 
	}
});

export const { setEvents, addEvent, removeEvent, updateEvent, clearEvents, setEventModalVisibility } = eventSlice.actions;
export default eventSlice.reducer;
