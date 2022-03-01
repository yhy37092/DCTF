import React, {useState} from "react";
import {Button, Card, Modal, Tab, Tabs} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import ChallengeDetail from "./ChallengeDetail";

export default ({challenge}) => {
    const {t} = useTranslation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Tabs className="mb-3">
                        <Tab eventKey="Challenge" title={t('description.Challenge')}>
                            <ChallengeDetail challenge={challenge}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <Card className="text-center">
                <Card.Header>{challenge.info.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{challenge.info.name}</Card.Title>
                    <Card.Text>{challenge.info.value} {t('description.point')}</Card.Text>
                    <Card.Link><Button variant={"outline-info"}
                                       onClick={handleShow}>{t('description.Detail')}</Button></Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}