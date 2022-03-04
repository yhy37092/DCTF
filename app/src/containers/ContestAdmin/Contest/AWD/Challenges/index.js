import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainPage from "./MainPage";
import Update from "./Update";
import New from "./New";

export default () => {

    return (
        <Routes>
            <Route path={`/`} element={<MainPage/>}/>
            <Route path={`/Challenge-:challengeId`} element={<Update/>}/>
            <Route path={`/New`} element={<New/>}/>
        </Routes>
    )
}