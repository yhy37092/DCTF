import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {NoMatch} from "../../components";
import MainPage from "./MainPage";


export default () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}