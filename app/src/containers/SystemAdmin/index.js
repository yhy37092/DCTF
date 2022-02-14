import React from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";

import Header from "./Header";
import Form from "./Form"
import HeadBar from "../../components/Navbar/HeaderBar";
import SideBarInfo from "../../components/Navbar/SideBarInfo";

export default ({drizzle, drizzleState}) => {

    return (
        <HeadBar>
            <SideBarInfo drizzle={drizzle} drizzleState={drizzleState}>
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
            </SideBarInfo>
        </HeadBar>
    );
};