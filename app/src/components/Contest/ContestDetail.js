import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {after, before, toDate, toEther} from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import React from "react";
import {useTranslation} from "react-i18next";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({contest}) => {
    const {t} = useTranslation();
    return (
        <Card>
            <Card.Header>{t(`description.${contest.info.contestType}`)}
                {before(contest.info.start) && <FontAwesomeIcon icon={solid("hourglass-start")}/>}
                {after(contest.info.start) && before(contest.info.end) &&
                    <FontAwesomeIcon icon={solid("hourglass-half")}/>}
                {after(contest.info.end) && <FontAwesomeIcon icon={solid("hourglass-end")}/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{contest.info.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem><ReactMarkdown>{contest.info.message}</ReactMarkdown></ListGroupItem>
                <ListGroupItem><strong>{t('description.Owner')}</strong>: {contest.owner}</ListGroupItem>
                <ListGroupItem><strong>{t('description.Fee')}</strong>: {toEther(contest.info.fee)} ether</ListGroupItem>
                <ListGroupItem><strong>{t('description.Start')}</strong>: {toDate(contest.info.start)}</ListGroupItem>
                <ListGroupItem><strong>{t('description.end')}</strong>: {toDate(contest.info.end)}</ListGroupItem>
            </ListGroup>
        </Card>
    )

}