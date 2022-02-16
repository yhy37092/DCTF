import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form"
import {Link, useParams} from "react-router-dom";

export default ({drizzle, drizzleState}) => {
    const {contestId} = useParams();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/ContestAdmin" className="breadcrumb-item">ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`} className="breadcrumb-item">Contest-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`} className="breadcrumb-item">Challenges</Link>
                        <Breadcrumb.Item active>New</Breadcrumb.Item>
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
                    <Form drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    );
};