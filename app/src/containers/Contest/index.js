import React from "react";
import {Route, Routes} from "react-router-dom";

import List from "./List/index";
import Detail from "./Detail";
import OnGoing from "./OnGoing";
import NoMatch from "../../components/NoMatch";
import {Contest} from "../../components/Navbars";
import My from "./My";

export default ({drizzle, drizzleState}) => {
    return (
        <>
            <Contest/>
            <Routes>
                <Route path={`/`} element={<List drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/My`} element={<My drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Contest-:contestId`} element={<Detail drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Contest-:contestId/ongoing`} element={<OnGoing drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};