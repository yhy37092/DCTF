import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {timeSince, toDate, toEther} from "../utils/utils";
import {Link} from "react-router-dom";

const ContestDetail = ({contest}) => {

    return (
        <Card>
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
const ContestPreview = ({contest, link}) => (
    <Card className="text-center" border="primary">
        <Card.Header>{contest.contestInfo.contestType}</Card.Header>
        <Card.Body>
            <Card.Title>{contest.contestInfo.name}</Card.Title>
            <Card.Text>{contest.contestInfo.description}</Card.Text>
            <Link to={link}>Detail</Link>
        </Card.Body>
        <Card.Footer
            className="text-muted">{timeSince(contest.timeStamp)}</Card.Footer>
    </Card>
)
export {
    ContestPreview,
    ContestDetail
}