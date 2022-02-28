import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {NoMatch} from "../../components";
import Contest from './Contest'
import MainPage from "./MainPage";
import New from "./New";

export default () => {

    return (
        <Routes>
            <Route path={`/`} element={<MainPage/>}/>
            <Route path={`/New`}
                   element={<New/>}/>
            <Route path={`/Contest-:contestId/*`}
                   element={<Contest/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}