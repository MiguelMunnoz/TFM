import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedUser: {}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
	    /* Manejo del array de tareas */
        setUser: (state, action) => {
            state.selectedUser = action.payload;
        },
	}
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
