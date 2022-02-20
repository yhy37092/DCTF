import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {toTeamState} from "../../utils/utils";

export default ({data}) => (
    <Card>
        <Card.Body>
            <Card.Title>{data.info.name}</Card.Title>
            <Card.Text><strong>captin: </strong>{data.info.captain}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
            {
                data.info.members.map((member, index) => (
                    <ListGroupItem key={index}><strong>member {index + 1}</strong>: {member}</ListGroupItem>
                ))
            }
        </ListGroup>
        <Card.Footer className="text-muted">{toTeamState(data.state)}</Card.Footer>
    </Card>
)