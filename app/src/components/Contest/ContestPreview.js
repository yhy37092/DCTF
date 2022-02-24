import {Card} from "react-bootstrap";
import {after, before, timeSince} from "../../utils/utils";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";

export default ({data, link}) => {
    const {t} = useTranslation();
    return (
        <Card className="text-center" border="primary">
            <Card.Header>{t(`description.${data.info.contestType}`)}
                {before(data.info.start) && <i className="fas fa-hourglass-start"/>}
                {after(data.info.start) && before(data.info.commitEnd) && <i className="fas fa-hourglass-half"/>}
                {after(data.info.commitEnd) && <i className="fas fa-hourglass-end"/>}
            </Card.Header>
            <Card.Body>
                <Card.Title>{data.info.name}</Card.Title>
                <Card.Text>{data.info.description}</Card.Text>
                <Link to={link}>{t('description.Detail')}</Link>
            </Card.Body>
            <Card.Footer
                className="text-muted">{timeSince(data.timeStamp)}</Card.Footer>
        </Card>
    )
}