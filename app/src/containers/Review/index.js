import {NoMatch} from "../../components";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Contest from "./Contest";
import MainPage from "./MainPage";

export default () => {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<MainPage/>}/>
                <Route path={`/Contest-:contestId/*`} element={<Contest/>}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}