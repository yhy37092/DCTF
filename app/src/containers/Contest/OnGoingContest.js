import React from "react";
import {after, before, toDate} from "../../utils/utils";
import {Col, Row} from "react-bootstrap";
import Countdown from "react-countdown";
import ListChallenge from "./ListChallenge";
import RevealChallenge from "./RevealChallenge";

export default ({contest, team}) => {
    return (
        <>
            {before(contest.info.start) ? (<>
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
            </>) : null}

            {after(contest.info.start) ? (<>
                <Row>
                    <Col>
                        <RevealChallenge contest={contest} team={team}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ListChallenge contest={contest} team={team}/>
                    </Col>
                </Row>
            </>) : null}
        </>
    )
}