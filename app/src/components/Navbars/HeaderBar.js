import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default () => (

        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Link to={"/"} className="navbar-brand">Decentralized CTF</Link>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Link to={"/SystemAdmin"} className="nav-link">System Admin</Link>
                        <Link to={"/ContestAdmin"} className="nav-link">Contest Admin</Link>
                        <Link to={"/Contests"} className="nav-link">Contests</Link>
                        <Link to={"/Review"} className="nav-link">Review</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)