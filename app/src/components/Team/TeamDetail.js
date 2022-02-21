import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {toTeamState} from "../../utils/utils";
import {useTranslation} from "react-i18next";

export default ({data}) => {
    const {t, i18n} = useTranslation();
    return (
        <Card>
            <Card.Body>
                <Card.Title>{data.info.name}</Card.Title>
                <Card.Text><strong>{t('description.Captain')}: </strong>{data.info.captain}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                {
                    data.info.members.map((value, index) => (
                        <ListGroupItem key={index}><strong>{t('description.member')} {index + 1}</strong>: {value}</ListGroupItem>
                    ))
                }
            </ListGroup>
            <Card.Footer className="text-muted">{toTeamState(data.state)}</Card.Footer>
        </Card>
    )
}