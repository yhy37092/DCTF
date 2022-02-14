import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

export const flagsSlice = createSlice({
    name: 'flags',
    initialState,
    reducers: {
        add (state,action) {
            state.data = [...state.data, action.payload]
        },
        remove(state, action) {
            state.data.splice(action.payload, 1);
        }
    }
});

export const { add, remove } = flagsSlice.actions;

export const getFlags = (state) => state.flags.data;

export default flagsSlice.reducer;