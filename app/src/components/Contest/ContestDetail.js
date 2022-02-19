import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";

export default ({contest}) => {

    return (
        <Card>
            <Card.Header>{contest.info.contestType}
                {before(contest.info.start) && <i className="fas fa-hourglass-start"/>}
                {after(contest.info.start) && before(contest.info.end) && <i className="fas fa-hourglass-half"/>}
                {after(contest.info.end) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{contest.info.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{contest.info.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>Owner</strong>: {contest.owner}</ListGroupItem>
                <ListGroupItem><strong>Fee</strong>: {toEther(contest.info.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>Start</strong>: {toDate(contest.info.start)}</ListGroupItem>
                <ListGroupItem><strong>End</strong>: {toDate(contest.info.end)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}