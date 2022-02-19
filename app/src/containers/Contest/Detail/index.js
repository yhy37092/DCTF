import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form";
import {useParams} from "react-router";
import TeamCard from "../../../components/Team";
import {Link} from "react-router-dom";
import {ContestDetail} from "../../../components/Contest";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    const {contests} = drizzle.contracts.Contests.methods;
    const {getOne} = drizzle.contracts.Teams.methods;

    const [contestKey, setContestKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contest = Contests.contests[contestKey];
    useEffect(() => {
        const contestKey = contests.cacheCall(contestId);
        setContestKey(contestKey);
    }, [contests, contestId])

    const [teamKey, setTeamKey] = useState(0);
    const team = drizzleState.contracts.Teams.getOne[teamKey]
    useEffect(() => {
        const teamKey = getOne.cacheCall(contestId, drizzleState.accounts[0]);
        setTeamKey(teamKey);
    }, [getOne, contestId, drizzleState.accounts])

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Breadcrumb.Item active>Contest-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Header drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    {
                        contest ? (
                            <ContestDetail contest={contest.value}/>
                        ) : null
                    }
                </Col>
            </Row>

            <Row>
                <Col>
                    {team && parseInt(team.value.state) === 0 ? (
                        <div align="center">
                            <h3>Apply contest</h3>
                            <Form contestId={contestId} drizzle={drizzle} drizzleState={drizzleState}/>
                        </div>
                    ) : null}
                    {team && parseInt(team.value.state) === 1 ? (
                        <div align="center">
                            <h3>Already applied,waiting for approving...</h3>
                            <h3>team info</h3>
                            <TeamCard team={team.value}/>
                        </div>
                    ) : null}
                    {team && parseInt(team.value.state) === 2 ? (
                        <div align="center">
                            <h3>your apply is approved</h3>
                            <h2><Link to={`/Contests/Contest-${contestId}/ongoing`}>Go to
                                contest</Link></h2>
                            <h3>team info</h3>
                            <TeamCard team={team.value}/>
                        </div>
                    ) : null}
                    {team && parseInt(team.value.state) === 3 ? (
                        <div align="center">
                            <h3>Sorry,your apply is rejected!!!</h3>
                            <h2>But you can re-apply</h2>
                            <h3>team info</h3>
                            <TeamCard team={team.value}/>
                            <Form contestId={contestId} drizzle={drizzle} drizzleState={drizzleState}/>
                        </div>
                    ) : null}
                </Col>
            </Row>
        </>

    );
};