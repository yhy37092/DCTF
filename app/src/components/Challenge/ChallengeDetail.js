import React from "react";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'

export default ({challenge}) => (
    <Card>
        <Card.Body>
            <Card.Title className="text-center"><strong>{challenge.info.name}</strong></Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroupItem
                className="text-center"><strong>{challenge.info.value}</strong> points</ListGroupItem>
            <ListGroupItem><ReactMarkdown>{challenge.info.message}</ReactMarkdown></ListGroupItem>
            {challenge.info.connectionInfo !== '' ?
                <ListGroupItem>URL: <a href={challenge.info.connectionInfo}>Go to</a></ListGroupItem> : null}
            {challenge.info.file !== '' ?
                <ListGroupItem>File: <a href={challenge.info.file}><i className="fas fa-download"/>Download</a></ListGroupItem> : null}
            {challenge.info.hint !== '' ?
                <ListGroupItem>hint: {challenge.info.hint}</ListGroupItem> : null}
        </ListGroup>
    </Card>
)