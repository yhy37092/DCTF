import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    Jeopardy: [],
    AWD: []
}

export const flagsSlice = createSlice({
    name: 'flags',
    initialState,
    reducers: {
        JeopardyAdd(state, action) {
            state.Jeopardy = [...state.Jeopardy, action.payload]
        },
        JeopardyRemove(state, action) {
            state.Jeopardy.splice(action.payload, 1)
        },
        AWDAdd(state, action) {
            state.AWD = [...state.AWD, action.payload]
        },
        AWDRemove(state, action) {
            state.AWD.splice(action.payload, 1)
        }
    }
})

export const {JeopardyAdd, JeopardyRemove, AWDAdd, AWDRemove} = flagsSlice.actions

export const getJeopardyFlags = (state) => state.flags.Jeopardy
export const getAWDFlags = (state) => state.flags.AWD

export default flagsSlice.reducer