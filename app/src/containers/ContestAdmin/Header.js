import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default () => {
    return (
                <h1 align="center">Contests
                    <Link to={"/contestAdmin/contest/new"}><Button variant="outline-secondary">
                        <i className="btn-fa fas fa-plus-circle"/>
                    </Button></Link>
                </h1>
    )
}