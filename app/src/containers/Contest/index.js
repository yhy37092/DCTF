import React from "react";
import {Route, Routes} from "react-router-dom";

import List from "./List/index";
import Detail from "./Detail";
import OnGoing from "./OnGoing";

export default ({drizzle, drizzleState}) => {
    return (
        <Routes>
            <Route path={`/`} element={<List drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Contest-:contestId`} element={<Detail drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Contest-:contestId/ongoing`} element={<OnGoing drizzle={drizzle} drizzleState={drizzleState}/>}/>
        </Routes>
    );
};