import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {toTeamState} from "../utils/utils";

export default ({team}) => (
    <Card>
        <Card.Body>
            <Card.Title>{team.teamInfo.name}</Card.Title>
            <Card.Text><strong>captin: </strong>{team.teamInfo.captain}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
            {
                team.teamInfo.members.map((member, index) => (
                    <ListGroupItem key={index}><strong>member {index + 1}</strong>: {member}</ListGroupItem>
                ))
            }
        </ListGroup>
        <Card.Footer className="text-muted">{toTeamState(team.state)}</Card.Footer>
    </Card>
)