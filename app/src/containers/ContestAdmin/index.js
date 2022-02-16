import React from "react";
import {Route, Routes} from "react-router-dom";

import List from "./List";
import New from "./New"
import Contest from "./Contest"

export default ({drizzle, drizzleState}) => {
    return (
        <Routes>
            <Route path={`/`} element={<List drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/ContestNew`}
                   element={<New drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Contest-:contestId/*`}
                   element={<Contest drizzle={drizzle} drizzleState={drizzleState}/>}/>
        </Routes>
    );
};