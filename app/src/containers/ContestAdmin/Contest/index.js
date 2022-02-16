import React from "react";
import {Route, Routes, useParams} from "react-router-dom";

import HeaderBarContest from "../../../components/Navbars/HeaderBarContest";
import Detail from "./Detail";
import Challenges from "./Challenges";
import Teams from "./Teams";
import Submissions from "./Submissions";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    return (
        <>
            <HeaderBarContest contestId={contestId}/>
            <Routes>
                <Route path={`/`} element={<Detail drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Challenges/*`} element={<Challenges drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Teams`} element={<Teams drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Submissions`} element={<Submissions drizzle={drizzle} drizzleState={drizzleState}/>}/>
            </Routes>
        </>
)
    ;
};