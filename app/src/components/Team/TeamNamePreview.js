import React, {useState} from "react";
import {Button, Modal, Tab, Tabs} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import TeamDetail from "./TeamDetail";

export default ({team}) => {
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
                        <Tab eventKey="Team" title={t('description.Team')}>
                            <TeamDetail data={team}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <Button variant="link" onClick={handleShow}>{team.info.name}</Button>
        </>
    )
}