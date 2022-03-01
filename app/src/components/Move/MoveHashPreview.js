import React, {useState} from "react";
import {Button, Modal, Tab, Tabs} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import MoveDetail from "./MoveDetail";

export default ({move}) => {
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
                        <Tab eventKey="Move" title={t('description.Move')}>
                            <MoveDetail move={move}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <Button variant="link" onClick={handleShow}>{move.info.hash.slice(0, 8)}...</Button>
        </>
    )
}