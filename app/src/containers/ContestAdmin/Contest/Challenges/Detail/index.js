import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form"
import Flag from "./Flag";
import {Link, useParams} from "react-router-dom";

export default ({drizzle, drizzleState}) => {

    const {contestId, challengeId} = useParams();

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/ContestAdmin" className="breadcrumb-item">ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`} className="breadcrumb-item">Contest-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`} className="breadcrumb-item">Challenges</Link>
                        <Breadcrumb.Item active>Challenge-{challengeId}</Breadcrumb.Item>
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
                    <Flag drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
                <Col>
                    <Form drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>
    );
};