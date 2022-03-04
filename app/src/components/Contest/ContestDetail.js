import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";
import {useTranslation} from "react-i18next";

export default ({contest}) => {
    const {t} = useTranslation();
    return (
        <Card>
            <Card.Header>{t(`description.${contest.info.contestType}`)}
                {before(contest.info.start) && <i className="fas fa-hourglass-start"/>}
                {after(contest.info.start) && before(contest.info.commitEnd) && <i className="fas fa-hourglass-half"/>}
                {after(contest.info.commitEnd) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{contest.info.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{contest.info.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>{t('description.Owner')}</strong>: {contest.owner}</ListGroupItem>
                <ListGroupItem><strong>{t('description.Fee')}</strong>: {toEther(contest.info.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>{t('description.Start')}</strong>: {toDate(contest.info.start)}</ListGroupItem>
                <ListGroupItem><strong>{t('description.commitEnd')}</strong>: {toDate(contest.info.commitEnd)}</ListGroupItem>
                <ListGroupItem><strong>{t('description.revealEnd')}</strong>: {toDate(contest.info.commitEnd)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}