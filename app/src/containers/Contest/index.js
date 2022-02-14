import React from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";

import Header from "./Header";
import List from "./List"
import SideBarInfo from "../../components/Navbar/SideBarInfo";

export default ({drizzle, drizzleState}) => {

    return (
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
                            <List drizzle={drizzle} drizzleState={drizzleState}/>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </SideBarInfo>
    );
};