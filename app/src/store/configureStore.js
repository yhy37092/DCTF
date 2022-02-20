import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import flagsSlice from '../reducers/flags'

const reducers = combineReducers({
    flags: flagsSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}