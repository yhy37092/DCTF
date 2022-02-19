import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";

export default ({contest}) => {

    return (
        <Card>
            <Card.Header>{contest.contestInfo.contestType}
                {before(contest.contestInfo.start) && <i className="fas fa-hourglass-start"/>}
                {after(contest.contestInfo.start) && before(contest.contestInfo.end) && <i className="fas fa-hourglass-half"/>}
                {after(contest.contestInfo.end) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{contest.contestInfo.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{contest.contestInfo.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>Owner</strong>: {contest.owner}</ListGroupItem>
                <ListGroupItem><strong>Fee</strong>: {toEther(contest.contestInfo.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>Start</strong>: {toDate(contest.contestInfo.start)}</ListGroupItem>
                <ListGroupItem><strong>End</strong>: {toDate(contest.contestInfo.end)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}