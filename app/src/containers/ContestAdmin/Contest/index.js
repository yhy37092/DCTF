import React from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {AWDContestAdminNavBar, JeopardyContestAdminNavBar, NoMatch} from '../../../components'
import Challenges from './Jeopardy/Challenges'
import MainPage from "./Jeopardy/MainPage";
import Teams from "./Jeopardy/Teams";
import Flags from "./Jeopardy/Flags";
import ScoreBoard from "./Jeopardy/ScoreBoard";
import Submissions from "./Jeopardy/Submissions";
import {contest as defaultContest} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import GameBox from "./AWD/GameBox";


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
                    <JeopardyContestAdminNavBar contestId={contest.id}/>
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
                    <AWDContestAdminNavBar contestId={contest.id}/>
                    <Routes>
                        <Route path={`/`} element={<MainPage/>}/>
                        <Route path={`/GameBox`} element={<GameBox/>}/>
                        <Route path={`/Teams`} element={<Teams/>}/>
                        <Route path={`/Flags`} element={<Flags/>}/>
                        <Route path={`/Submissions`} element={<Submissions/>}/>
                        <Route path={`/ScoreBoard`} element={<ScoreBoard/>}/>
                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </>
            }
        </>
    )
}