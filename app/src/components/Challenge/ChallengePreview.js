import React from "react";
import {Button, Card} from "react-bootstrap";

export default ({data,callback}) => (
    <Card className="text-center">
        <Card.Header>{data.info.category}</Card.Header>
        <Card.Body>
            <Card.Title>{data.info.name}</Card.Title>
            <Card.Text>{data.info.value} point</Card.Text>
            <Card.Link><Button variant={"outline-info"} onClick={callback}>Detail</Button></Card.Link>
        </Card.Body>
    </Card>
)