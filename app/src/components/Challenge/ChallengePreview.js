import React from "react";
import {Button, Card} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default ({data,callback}) => {
    const {t, i18n} = useTranslation();
    return (<Card className="text-center">
        <Card.Header>{data.info.category}</Card.Header>
        <Card.Body>
            <Card.Title>{data.info.name}</Card.Title>
            <Card.Text>{data.info.value} {t('description.point')}</Card.Text>
            <Card.Link><Button variant={"outline-info"} onClick={callback}>{t('description.Detail')}</Button></Card.Link>
        </Card.Body>
    </Card>)
}