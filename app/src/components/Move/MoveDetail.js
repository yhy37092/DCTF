import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {toDate} from "../../utils/utils";
import {useTranslation} from "react-i18next";

export default ({move}) => {
    const {t} = useTranslation();
    return (<Card>
        <Card.Body>
            <Card.Title className="text-center">{t('description.Id')}: {move.id}</Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroupItem>{t('description.Hash')}: <strong>{move.info.hash}</strong></ListGroupItem>
            <ListGroupItem>{t('description.Flag')}: <strong>{move.info.flag}</strong></ListGroupItem>
            <ListGroupItem>{t('description.Salt')}: <strong>{move.info.salt}</strong></ListGroupItem>
            <ListGroupItem>{t('description.SubmitTime')}: <strong>{toDate(move.timeStamp)}</strong></ListGroupItem>
        </ListGroup>
    </Card>)
}