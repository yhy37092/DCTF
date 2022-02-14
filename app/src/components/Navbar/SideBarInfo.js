import React from "react";
import {Col, Container, Nav, Row} from "react-bootstrap";
import User from "../User";

export default ({drizzle, drizzleState, children}) => {
    return (
        <Container >
            <Row>
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <Nav className="me-auto">
                            <User drizzle={drizzle} drizzleState={drizzleState}/>
                        </Nav>
                    </div>
                </nav>

                <p/><p/>
                <Col className="col-md-9 ms-sm-auto col-lg-10">
                    <div className="justify-content-between align-items-center">
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}