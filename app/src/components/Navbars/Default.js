import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import CustomLink from "./CustomLink";


export default () => {


    return (<Navbar bg="dark" variant="dark" fixed="top">
        <Container>
            <CustomLink to={"/"} className="navbar-brand">Decentralized CTF</CustomLink>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Item>
                        <CustomLink to="/SystemAdmin">System Admin</CustomLink>
                    </Nav.Item>
                    <Nav.Item>
                        <CustomLink to={"/ContestAdmin"}>Contest Admin</CustomLink>
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
    </Navbar>)
}