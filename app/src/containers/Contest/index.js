import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {ContestNavBar, NoMatch,} from "../../components";
import MainPage from "./MainPage";
import My from "./My";
import Contest from "./Contest";
import OnGoing from "./OnGoing";

export default () => {
    return (
        <>
            <ContestNavBar/>
            <Routes>
                <Route path={`/`} element={<MainPage/>}/>
                <Route path={`/My`} element={<My/>}/>
                <Route path={`/Contest-:contestId`} element={<Contest/>}/>
                <Route path={`/Contest-:contestId/ongoing`} element={<OnGoing/>}/>
                <Route path={`/My/Contest-:contestId`} element={<Contest/>}/>
                <Route path={`/My/Contest-:contestId/ongoing`} element={<OnGoing/>}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}



