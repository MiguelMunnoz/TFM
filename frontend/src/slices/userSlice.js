import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedUser: {}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
        setUser: (state, action) => {
            state.selectedUser = action.payload;
        },
		clearUser: (state) => {
			state.selectedUser = null;
		}
	}
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
