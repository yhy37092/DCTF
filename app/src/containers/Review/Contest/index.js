import React from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {JeopardyReviewNavBar, NoMatch} from '../../../components'
import Challenges from './Challenges'
import MainPage from "./MainPage";
import Teams from "./Teams";
import ScoreBoard from "./ScoreBoard";
import Flags from "./Flags";
import Submissions from "./Submissions";
import {contest as defaultContest} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default () => {

    const {contestId} = useParams()
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <Show contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}/>
        </>
    )
}

function Show({contest}) {
    return (
        <>
            {
                contest.info.contestType === 'Jeopardy' && <>
                    <JeopardyReviewNavBar contestId={contest.id}/>
                    <Routes>
                        <Route path={`/`} element={<MainPage/>}/>
                        <Route path={`/Challenges/*`} element={<Challenges/>}/>
                        <Route path={`/Teams`} element={<Teams/>}/>
                        <Route path={`/Flags`} element={<Flags/>}/>
                        <Route path={`/Submissions`} element={<Submissions/>}/>
                        <Route path={`/ScoreBoard`} element={<ScoreBoard/>}/>
                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </>
            }
            {
                contest.info.contestType === 'AWD' && <>
                    <p>to add</p>
                </>
            }
        </>
    )
}