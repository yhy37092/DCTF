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
                    <Form drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    );
};