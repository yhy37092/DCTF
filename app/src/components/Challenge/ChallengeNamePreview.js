import React, {useState} from "react";
import {Button, Modal, Tab, Tabs} from "react-bootstrap";
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
            <Button variant="link" onClick={handleShow}>{challenge.info.name}</Button>
        </>
    )
}