import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form"

export default ({drizzle, drizzleState}) => {

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>ContestAdmin</Breadcrumb.Item>
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