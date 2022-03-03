import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default ({gameBox}) => {
    const {t} = useTranslation();
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center"><strong>{gameBox.info.ip}:{gameBox.info.port}</strong></Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem>
                    {t('description.Flag_SSH_Port')}: {gameBox.info.Flag_SSH_Port}
                </ListGroupItem>
                <ListGroupItem>
                    {t('description.Flag_SSH_User_Name')}: {gameBox.info.Flag_SSH_User_Name}
                </ListGroupItem>
                <ListGroupItem>
                    {t('description.Flag_SSH_Password')}: {gameBox.info.Flag_SSH_Password}
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}