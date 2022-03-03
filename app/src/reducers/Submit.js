import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    Jeopardy: [],
    AWD: []
}

export const submitsSlice = createSlice({
    name: 'submits',
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

export const {JeopardyAdd, JeopardyRemove, AWDAdd, AWDRemove} = submitsSlice.actions

export const getJeopardySubmits = (state) => state.submits.Jeopardy
export const getAWDSubmits = (state) => state.submits.AWD

export default submitsSlice.reducer