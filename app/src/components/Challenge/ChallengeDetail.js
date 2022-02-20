import React from "react";
import { Card, ListGroup, ListGroupItem} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'

export default ({data}) => (
    <Card>
        <Card.Body>
            <Card.Title className="text-center"><strong>{data.info.name}</strong></Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroupItem
                className="text-center"><strong>{data.info.value}</strong> points</ListGroupItem>
            <ListGroupItem><ReactMarkdown>{data.info.message}</ReactMarkdown></ListGroupItem>
            {data.info.connectionInfo !== '' ?
                <ListGroupItem>URL: <a href={data.info.connectionInfo}>Go to</a></ListGroupItem> : null}
            {data.info.file !== '' ?
                <ListGroupItem>File: <a href={data.info.file}><i className="fas fa-download"/>Download</a></ListGroupItem> : null}
            {data.info.hint !== '' ?
                <ListGroupItem>hint: {data.info.hint}</ListGroupItem> : null}
        </ListGroup>
    </Card>
)