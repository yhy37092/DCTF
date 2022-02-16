import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

export default ({contestId}) => (

    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
            <Link to={"/"} className="navbar-brand">Decentralized CTF</Link>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Link to={"/SystemAdmin"} className="nav-link">System Admin</Link>
                    <NavDropdown title="Contest Admin">
                        <Link to={`/ContestAdmin/Contest-${contestId}`} className="dropdown-item">Contest</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`} className="dropdown-item">Challenges</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Teams`} className="dropdown-item">Teams</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Submissions`} className="dropdown-item">Submissions</Link>
                    </NavDropdown>

                    <Link to={"/Contests"} className="nav-link">Contests</Link>
                    <Link to={"/Review"} className="nav-link">Review</Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)