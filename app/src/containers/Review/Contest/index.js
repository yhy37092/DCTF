import React from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {AWDReviewNavBar, JeopardyReviewNavBar, NoMatch} from '../../../components'
import Challenges from './Jeopardy/Challenges'
import MainPage from "./MainPage";
import Teams from "./Teams";
import JeopardyScoreBoard from "./Jeopardy/ScoreBoard";
import JeopardyFlags from "./Jeopardy/Flags";
import JeopardySubmissions from "./Jeopardy/Submissions";
import AWDScoreBoard from "./AWD/ScoreBoard";
import AWDFlags from "./AWD/Flags";
import AWDSubmissions from "./AWD/Submissions";
import {contest as defaultContest} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import GameBoxes from "./AWD/GameBoxes";

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
                        <Route path={`/Flags`} element={<JeopardyFlags/>}/>
                        <Route path={`/Submissions`} element={<JeopardySubmissions/>}/>
                        <Route path={`/ScoreBoard`} element={<JeopardyScoreBoard/>}/>
                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </>
            }
            {
                contest.info.contestType === 'AWD' && <>
                    <AWDReviewNavBar contestId={contest.id}/>
                    <Routes>
                        <Route path={`/`} element={<MainPage/>}/>
                        <Route path={`/Challenges/*`} element={<Challenges/>}/>
                        <Route path={`/GameBoxes`} element={<GameBoxes/>}/>
                        <Route path={`/Teams`} element={<Teams/>}/>
                        <Route path={`/Flags`} element={<AWDFlags/>}/>
                        <Route path={`/Submissions`} element={<AWDSubmissions/>}/>
                        <Route path={`/ScoreBoard`} element={<AWDScoreBoard/>}/>
                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </>
            }
        </>
    )
}