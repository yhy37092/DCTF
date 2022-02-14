import React from "react";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'

export default ({challenge}) => (
    <Card>
        <Card.Body>
            <Card.Title className="text-center"><strong>{challenge.challengeInfo.name}</strong></Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroupItem
                className="text-center"><strong>{challenge.challengeInfo.value}</strong> points</ListGroupItem>
            <ListGroupItem><ReactMarkdown>{challenge.challengeInfo.message}</ReactMarkdown></ListGroupItem>
            {challenge.challengeInfo.connectionInfo !== '' ?
                <ListGroupItem>URL: <a href={challenge.challengeInfo.connectionInfo}>Go to</a></ListGroupItem> : null}
            {challenge.challengeInfo.file !== '' ?
                <ListGroupItem>File: <a href={challenge.challengeInfo.file}><i className="fas fa-download"/>Download</a></ListGroupItem> : null}
            {challenge.challengeInfo.hint !== '' ?
                <ListGroupItem>hint: {challenge.challengeInfo.hint}</ListGroupItem> : null}
        </ListGroup>
    </Card>
)