import {Card} from "react-bootstrap";
import {after, before, timeSince} from "../../utils/utils";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({contest}) => {
    const {t} = useTranslation();
    return (
        <Card className="text-center" border="primary">
            <Card.Header>{t(`description.${contest.info.contestType}`)}
                {before(contest.info.start) && <FontAwesomeIcon icon={solid("hourglass-start")}/>}
                {after(contest.info.start) && before(contest.info.revealEnd) &&
                    <FontAwesomeIcon icon={solid("hourglass-half")}/>}
                {after(contest.info.revealEnd) && <FontAwesomeIcon icon={solid("hourglass-end")}/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{contest.info.name}</Card.Title>
                <Card.Text>{contest.info.description}</Card.Text>
                <Link to={`Contest-${contest.id}`}>{t('description.Detail')}</Link>
            </Card.Body>
            <Card.Footer
                className="text-muted">{timeSince(contest.timeStamp)}</Card.Footer>
        </Card>
    )
}