import React from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form"
import SiderBarContest from "../../../../components/Navbar/SiderBarContest";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    return (
        <SiderBarContest drizzle={drizzle} drizzleState={drizzleState} contestId={contestId}>
            <Container>
                <Stack gap={4}>
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
                </Stack>
            </Container>
        </SiderBarContest>
    );
};