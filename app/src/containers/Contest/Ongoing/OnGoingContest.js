import React from "react";
import {before, toDate} from "../../../utils/utils";
import {Col, Row} from "react-bootstrap";
import Countdown from "react-countdown";
import ListChallenge from "./ListChallenge";
import RevealChallenge from "./RevealChallenge";
import {contest as defaultContest, team as defaultTeam} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            {
                useCacheCall(['Contests'], call => {
                    const contest = call('Contests', 'getContest', contestId) || defaultContest
                    const teamId = parseInt((call("Teams", 'getMyTeamId', contestId) || defaultTeam).id)
                    if (before(contest.info.start)) return (
                        <div>
                            <Row>
                                <Col>
                                    <h1 align="center">
                                        <Countdown date={new Date(parseInt(contest.info.start) * 1000)}/>
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div align="center">
                                        <h1>contest will begin at</h1>
                                        <h1><strong>{toDate(contest.info.start)}</strong></h1>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                    else return (
                        <div>
                            <Row>
                                <Col>
                                    <RevealChallenge contestId={contestId}
                                                     teamId={teamId}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ListChallenge contestId={contestId}
                                                   teamId={teamId}/>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
        </>
    )
}