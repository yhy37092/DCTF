import React from "react";
import {Col, Row} from "react-bootstrap";
import {ContestDetail} from "./index";
import {contest as defaultContest} from '../../MetaData.json'
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <Row>
                <Col>
                    <ContestDetail data={useCacheCall('Contests', 'contests', contestId) || defaultContest}/>
                </Col>
            </Row>
        </>
    );
};