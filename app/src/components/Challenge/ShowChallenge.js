import React, {useCallback, useState} from "react";
import {Modal, Tab, Tabs} from "react-bootstrap";
import ChallengeDetail from "./ChallengeDetail";
import {ChallengePreview} from "../index";
import {useTranslation} from "react-i18next";

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
                            <ChallengeDetail data={challenge}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <ChallengePreview data={challenge} callback={useCallback(handleShow, [])}/>
        </>
    )
}