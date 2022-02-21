import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";
import {useTranslation} from "react-i18next";

export default ({data}) => {
    const {t, i18n} = useTranslation();
    return (
        <Card>
            <Card.Header>{t(`description.${data.info.contestType}`)}
                {before(data.info.start) && <i className="fas fa-hourglass-start"/>}
                {after(data.info.start) && before(data.info.end) && <i className="fas fa-hourglass-half"/>}
                {after(data.info.end) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{data.info.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{data.info.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>{t('description.Owner')}</strong>: {data.owner}</ListGroupItem>
                <ListGroupItem><strong>{t('description.Fee')}</strong>: {toEther(data.info.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>{t('description.Start')}</strong>: {toDate(data.info.start)}</ListGroupItem>
                <ListGroupItem><strong>{t('description.End')}</strong>: {toDate(data.info.end)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}