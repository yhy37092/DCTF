import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";

import Header from "./Header";
import List from "./List"
import {Link, useParams} from "react-router-dom";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Link to={`/Contests/Contest-${contestId}`} className="breadcrumb-item">Contest-{contestId}</Link>
                        <Breadcrumb.Item active>OnGoing</Breadcrumb.Item>
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