import {Card} from "react-bootstrap";
import {after, before, timeSince} from "../../utils/utils";
import {Link} from "react-router-dom";
import React from "react";

export default ({contest, link}) => (
    <Card className="text-center" border="primary">
        <Card.Header>{contest.contestInfo.contestType}
            {before(contest.contestInfo.start) && <i className="fas fa-hourglass-start"/>}
            {after(contest.contestInfo.start) && before(contest.contestInfo.end) && <i className="fas fa-hourglass-half"/>}
            {after(contest.contestInfo.end) && <i className="fas fa-hourglass-end"/>}
        </Card.Header>
        <Card.Body>
            <Card.Title>{contest.contestInfo.name}</Card.Title>
            <Card.Text>{contest.contestInfo.description}</Card.Text>
            <Link to={link}>Detail</Link>
        </Card.Body>
        <Card.Footer
            className="text-muted">{timeSince(contest.timeStamp)}</Card.Footer>
    </Card>
)