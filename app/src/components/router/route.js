import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../containers/Home";
import SystemAdmin from "../../containers/SystemAdmin";
import ContestAdmin from "../../containers/ContestAdmin";
import ContestAdminContestNew from "../../containers/ContestAdmin/New";
import ContestAdminContestUpdate from "../../containers/ContestAdmin/Update";
import ContestAdminChallenges from "../../containers/ContestAdmin/Challenges";
import ContestAdminChallengeNew from "../../containers/ContestAdmin/Challenges/New";
import ContestAdminChallengeUpdate from "../../containers/ContestAdmin/Challenges/Update";
import ContestAdminTeams from "../../containers/ContestAdmin/Teams";
import ContestsUpcoming from "../../containers/Contest";
import ContestUpcomingDetail from "../../containers/Contest/Detail";
import ContestOngoing from "../../containers/Contest/OnGoing";

export default ({drizzle, drizzleState}) => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>

                <Route path="/systemAdmin" element={<SystemAdmin drizzle={drizzle}
                                                                 drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin" element={<ContestAdmin drizzle={drizzle}
                                                                   drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/contest/new"
                       element={<ContestAdminContestNew drizzle={drizzle}
                                                        drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/contest/:contestId"
                       element={<ContestAdminContestUpdate drizzle={drizzle}
                                                           drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/Contest/:contestId/challenges"
                       element={<ContestAdminChallenges drizzle={drizzle}
                                                        drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/Contest/:contestId/challenge/new"
                       element={<ContestAdminChallengeNew drizzle={drizzle}
                                                          drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/Contest/:contestId/challenge/:challengeId"
                       element={<ContestAdminChallengeUpdate drizzle={drizzle}
                                                             drizzleState={drizzleState}/>}/>
                <Route path="/contestAdmin/Contest/:contestId/teams"
                       element={<ContestAdminTeams drizzle={drizzle}
                                                   drizzleState={drizzleState}/>}/>
                <Route path="/contests"
                       element={<ContestsUpcoming drizzle={drizzle}
                                                  drizzleState={drizzleState}/>}/>
                <Route path="/contest/:contestId"
                       element={<ContestUpcomingDetail drizzle={drizzle}
                                                       drizzleState={drizzleState}/>}/>
                <Route path="/contest/:contestId/ongoing"
                       element={<ContestOngoing drizzle={drizzle}
                                                drizzleState={drizzleState}/>}/>
            </Routes>
        </Router>
    )
}