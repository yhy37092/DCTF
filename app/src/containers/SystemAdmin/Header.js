import React, {useState} from "react";
import Web3Utils from "web3-utils";
import {Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalFooter} from "react-bootstrap";

export default ({drizzle, drizzleState}) => {
    const CONTEST_ADMIN = Web3Utils.keccak256("CONTEST_ADMIN");
    const {grantRole} = drizzle.contracts.AccessContr0l.methods;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [account, setAccount] = useState("");
    const handleGrant = (event) => {
        event.preventDefault();
        grantRole.cacheSend(CONTEST_ADMIN, account);
    }
    return (
        <>
            <h1 align="center">Contest admins
                <Button variant="outline-secondary" onClick={handleShow}>
                    <i className="btn-fa fas fa-plus-circle"/>
                </Button>
            </h1>

            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>grant a contest admin</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleGrant}>
                    <Modal.Body>
                        <FormGroup>
                            <FormLabel>account address</FormLabel>
                            <FormControl key="account" type="text" name="account" value={account}
                                         placeholder="Enter account"
                                         onChange={event => setAccount(event.target.value)}/>
                        </FormGroup>
                        <ModalFooter>
                            <Button key="submit" variant="primary" type="button"
                                    onClick={handleGrant}>Submit</Button>
                        </ModalFooter>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    )
}