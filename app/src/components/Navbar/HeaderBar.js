import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default ({children}) => (
    <>
        <Navbar className="navbar navbar-dark sticky-top bg-dark shadow">
            <Container>
                <Link to={"/"} className="navbar-brand">Decentralized CTF</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/SystemAdmin"} className="nav-link">System admin</Link>
                        <Link to={"/ContestAdmin"} className="nav-link">Contest admin</Link>
                        <Link to={"/Contests"} className="nav-link">Contests</Link>
                        <Link to={"/Review"} className="nav-link">Review</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {children}
    </>
)