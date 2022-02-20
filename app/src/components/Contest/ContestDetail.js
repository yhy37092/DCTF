import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";

export default ({data}) => {

    return (
        <Card>
            <Card.Header>{data.info.contestType}
                {before(data.info.start) && <i className="fas fa-hourglass-start"/>}
                {after(data.info.start) && before(data.info.end) && <i className="fas fa-hourglass-half"/>}
                {after(data.info.end) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{data.info.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{data.info.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>Owner</strong>: {data.owner}</ListGroupItem>
                <ListGroupItem><strong>Fee</strong>: {toEther(data.info.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>Start</strong>: {toDate(data.info.start)}</ListGroupItem>
                <ListGroupItem><strong>End</strong>: {toDate(data.info.end)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}