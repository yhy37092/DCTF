import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import Countdown from "react-countdown";

import Header from "./Header";
import List from "./List"
import {after, before, toDate} from "../../../utils/utils";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    const {contests} = drizzle.contracts.Contests.methods;

    const [contestKey, setContestKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contest = Contests.contests[contestKey]
    useEffect(() => {
        const contestKey = contests.cacheCall(contestId);
        setContestKey(contestKey);
    }, [contests, contestId])

    return (<>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Link to={`/Contests/Contest-${contestId}`}
                              className="breadcrumb-item">Contest-{contestId}</Link>
                        <Breadcrumb.Item active>OnGoing</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {contest && before(contest.value.contestInfo.start) ? (<>
                <Row>
                    <Col>
                        <h1 align="center">
                            <Countdown date={new Date(parseInt(contest.value.contestInfo.start) * 1000)}/>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div align="center">
                            <h1>contest will begin at</h1>
                            <h1><strong>{toDate(contest.value.contestInfo.start)}</strong></h1>
                        </div>
                    </Col>
                </Row>
            </>) : null}

            {contest && after(contest.value.contestInfo.start) ? (<>
                <Row>
                    <Col>
                        <Header drizzle={drizzle} drizzleState={drizzleState}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <List drizzle={drizzle} drizzleState={drizzleState}/>
                    </Col>
                </Row>
            </>) : null}
        </>

    );
};