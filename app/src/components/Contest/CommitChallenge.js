import {useDispatch, useSelector} from "react-redux";
import {getUserFlags, userAdd, userRemove} from "../../reducers/flags";
import React, {useCallback, useEffect, useState} from "react";
import Web3Utils from "web3-utils";
import {Modal, Tab, Tabs} from "react-bootstrap";
import ChallengeDetail from "../Challenge/ChallengeDetail";
import CommitForm from "../Forms/CommitForm";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import ChallengePreview from "../Challenge/ChallengePreview";
import TransactionStatuses from "../TransactionStatuses";

export default ({contest, team, challenge}) => {
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
                        <Tab eventKey="Challenge" title="Challenge">
                            <ChallengeDetail data={challenge}/>
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
                            contestId: contest.id,
                            teamId: team.id,
                            challengeId: challenge.id,
                            flag: flag,
                            salt: salt
                        }));
                        send(contest.id, team.id, challenge.id, Web3Utils.soliditySha3(flag, salt))
                    },[])}/>
                </Modal.Footer>
            </Modal>
            <ChallengePreview data={challenge} callback={useCallback(handleShow, [])}/>
        </>
    )
}