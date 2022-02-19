import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import List from "./List"
import {Link} from "react-router-dom";

export default ({drizzle, drizzleState}) => {

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Breadcrumb.Item active>My</Breadcrumb.Item>
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