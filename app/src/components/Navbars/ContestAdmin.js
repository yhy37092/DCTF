import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";

export default ({contestId}) => (

    <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
            <Link to={"/"} className="navbar-brand">Decentralized CTF</Link>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Item>
                        <CustomLink to="/SystemAdmin">System Admin</CustomLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Contest Admin">
                            <Link to={`/ContestAdmin/Contest-${contestId}`} className="dropdown-item">Contest</Link>
                            <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`} className="dropdown-item">Challenges</Link>
                            <Link to={`/ContestAdmin/Contest-${contestId}/Teams`} className="dropdown-item">Teams</Link>
                            <Link to={`/ContestAdmin/Contest-${contestId}/Submissions`} className="dropdown-item">Submissions</Link>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <CustomLink to={"/Contests"}>Contests</CustomLink>
                    </Nav.Item>
                    <Nav.Item>
                        <CustomLink to={"/Review"}>Review</CustomLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)