import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserData: [],
    AdminData: []
};

export const flagsSlice = createSlice({
    name: 'flags',
    initialState,
    reducers: {
        userAdd (state,action) {
            state.UserData = [...state.UserData, action.payload]
        },
        userRemove(state, action) {
            state.UserData.splice(action.payload, 1);
        },
        adminAdd (state,action) {
            state.AdminData = [...state.AdminData, action.payload]
        },
        adminRemove(state, action) {
            state.AdminData.splice(action.payload, 1);
        }
    }
});

export const { userAdd, userRemove, adminAdd, adminRemove } = flagsSlice.actions;

export const getUserFlags = (state) => state.flags.UserData;
export const getAdminFlags = (state) => state.flags.AdminData;

export default flagsSlice.reducer;