import React from "react";
import {Routes, Route} from "react-router-dom";

import Detail from "./Detail";
import List from "./List";
import New from "./New";

export default ({drizzle, drizzleState}) => {
    return (
        <Routes>
            <Route path={`/`} element={<List drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Challenge-:challengeId`} element={<Detail drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/New`} element={<New drizzle={drizzle} drizzleState={drizzleState}/>}/>
        </Routes>
    );
};