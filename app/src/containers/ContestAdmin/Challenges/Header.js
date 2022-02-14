import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useParams} from "react-router";

export default () => {
    const {contestId} = useParams();
    return (
        <h1 align="center">Challenges
            <Link to={`/contestAdmin/contest/${contestId}/challenge/new`}><Button
                variant="outline-secondary"><i
                className="btn-fa fas fa-plus-circle"/></Button></Link>
        </h1>
    )
}