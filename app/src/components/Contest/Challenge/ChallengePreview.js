import {useDispatch, useSelector} from "react-redux";
import {getUserFlags, userAdd, userRemove} from "../../../reducers/flags";
import React, {useCallback, useEffect, useState} from "react";
import Web3Utils from "web3-utils";
import {Button, Card, Modal, Tab, Tabs} from "react-bootstrap";
import ChallengeDetail from "../../Challenge/ChallengeDetail";
import CommitForm from "../../Forms/CommitForm";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../TransactionStatuses";
import {useTranslation} from "react-i18next";

export default ({contestId, teamId, challenge}) => {
    const {t} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Moves', 'commitForMember')
    const flags = useSelector(getUserFlags);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState('');

    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challenge.id && setFlag(flag.flag))
    }, [flags, challenge.id])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
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
                <Modal.Footer>
                    <CommitForm data={flag} onSubmit={useCallback(({_data}) => {
                        flags.forEach((item, index) => {
                            if (item.challengeId === challenge.id)
                                dispatch(userRemove(index));
                        })
                        const salt = Web3Utils.randomHex(32);
                        dispatch(userAdd({
                            contestId: contestId,
                            teamId: teamId,
                            challengeId: challenge.id,
                            flag: _data,
                            salt: salt
                        }));
                        send(contestId, teamId, challenge.id, Web3Utils.soliditySha3(_data, salt))
                    }, [contestId, teamId, challenge, flags, send, dispatch])}/>
                </Modal.Footer>
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