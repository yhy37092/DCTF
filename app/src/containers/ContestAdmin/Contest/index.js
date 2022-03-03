import React from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {AWDContestAdminNavBar, JeopardyContestAdminNavBar, NoMatch} from '../../../components'
import JeopardyChallenges from './Jeopardy/Challenges'
import AWDChallenges from './AWD/Challenges'
import MainPage from "./MainPage";
import Teams from "./Teams";
import JeopardyFlags from "./Jeopardy/Flags";
import AWDFlags from './AWD/Flags'
import JeopardyScoreBoard from "./Jeopardy/ScoreBoard";
import AWDScoreBoard from "./AWD/ScoreBoard";
import JeopardySubmissions from "./Jeopardy/Submissions";
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
                    <JeopardyContestAdminNavBar contestId={contest.id}/>
                    <Routes>
                        <Route path={`/`} element={<MainPage/>}/>
                        <Route path={`/Challenges/*`} element={<JeopardyChallenges/>}/>
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
                    <AWDContestAdminNavBar contestId={contest.id}/>
                    <Routes>
                        <Route path={`/`} element={<MainPage/>}/>
                        <Route path={`/Challenges/*`} element={<AWDChallenges/>}/>
                        <Route path={`/GameBoxes/*`} element={<GameBoxes/>}/>
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