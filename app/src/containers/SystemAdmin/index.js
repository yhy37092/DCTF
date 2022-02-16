import React from "react";
import {Route, Routes} from "react-router-dom";

import List from "./List";

export default ({drizzle, drizzleState}) => {
    return (
        <Routes>
            <Route path={`/`} element={<List drizzle={drizzle} drizzleState={drizzleState}/>}/>
        </Routes>
    );
};
