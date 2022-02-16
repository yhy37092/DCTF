import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import List from "./List"

export default ({drizzle, drizzleState}) => {

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Contests</Breadcrumb.Item>
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
                    <List drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>
    );
};