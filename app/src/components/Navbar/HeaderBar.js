import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export default () => (
    <Navbar  className="navbar navbar-dark sticky-top bg-dark shadow">
        <Container>
            <Navbar.Brand href="/">Decentralized CTF</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/SystemAdmin">System admin</Nav.Link>
                    <Nav.Link href="/ContestAdmin">Contest admin</Nav.Link>
                    <Nav.Link href="/Contests">Contests</Nav.Link>
                    <Nav.Link href="/Review">Review</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)