import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUserFlags, userAdd, userRemove} from "../../../reducers/flags";
import React, {useEffect, useState} from "react";
import Web3Utils from "web3-utils";
import {Button, Card, FormControl, InputGroup, Modal, Tab, Tabs} from "react-bootstrap";
import Challenge from "../../../components/Challenge";

export default ({drizzle, drizzleState, challenge, teamId}) => {

    const {contestId} = useParams();

    const flags = useSelector(getUserFlags);
    const dispatch = useDispatch();

    const {commitForMember} = drizzle.contracts.Moves.methods;

    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState('');

    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challenge.id && setFlag(flag.flag))
    }, [flags, challenge.id])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        // remove old
        flags.forEach((item, index) => {
            if (item.challengeId === challenge.id)
                dispatch(userRemove(index));
        })
        // add new
        const salt = Web3Utils.randomHex(32);
        dispatch(userAdd({contestId: contestId, teamId: teamId, challengeId: challenge.id, flag: flag, salt: salt}));
        commitForMember.cacheSend(contestId, teamId, challenge.id, Web3Utils.soliditySha3(flag, salt));
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Tabs className="mb-3">
                        <Tab eventKey="Challenge" title="Challenge">
                            <Challenge challenge={challenge}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="flag" onChange={event => setFlag(event.target.value)}
                                     value={flag}/>
                        <Button onClick={handleSubmit}>Commit</Button>
                    </InputGroup>
                </Modal.Footer>
            </Modal>
            <Card className="text-center">
                <Card.Header>{challenge.challengeInfo.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{challenge.challengeInfo.name}</Card.Title>
                    <Card.Text>{challenge.challengeInfo.value} point</Card.Text>
                    <Card.Link><Button variant={"outline-info"} onClick={handleShow}>Detail</Button></Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}