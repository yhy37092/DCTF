import {Card} from "react-bootstrap";
import {after, before, timeSince} from "../../utils/utils";
import {Link} from "react-router-dom";
import React from "react";

export default ({contest, link}) => (
    <Card className="text-center" border="primary">
        <Card.Header>{contest.info.contestType}
            {before(contest.info.start) && <i className="fas fa-hourglass-start"/>}
            {after(contest.info.start) && before(contest.info.end) && <i className="fas fa-hourglass-half"/>}
            {after(contest.info.end) && <i className="fas fa-hourglass-end"/>}
        </Card.Header>
        <Card.Body>
            <Card.Title>{contest.info.name}</Card.Title>
            <Card.Text>{contest.info.description}</Card.Text>
            <Link to={link}>Detail</Link>
        </Card.Body>
        <Card.Footer
            className="text-muted">{timeSince(contest.timeStamp)}</Card.Footer>
    </Card>
)