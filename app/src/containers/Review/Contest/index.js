import React from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {NoMatch, ReviewNavBar} from '../../../components'
import Challenges from './Challenges'
import MainPage from "./MainPage";
import Teams from "./Teams";
import ScoreBoard from "./ScoreBoard";
import Flags from "./Flags";
import Submissions from "./Submissions";

export default () => {

    const {contestId} = useParams()

    return (
        <>
            <ReviewNavBar contestId={contestId}/>
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
    )
}
