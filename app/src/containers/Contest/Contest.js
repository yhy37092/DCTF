import React from "react";
import {Col, Row} from "react-bootstrap";
import {contest as defaultContest} from '../../MetaData.json'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {ContestDetail} from "../../components";

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