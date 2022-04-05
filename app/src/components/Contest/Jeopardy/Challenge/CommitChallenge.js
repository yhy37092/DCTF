import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getJeopardySubmits, JeopardyAdd, JeopardyRemove} from "../../../../reducers/Submit";
import CommitForm from "../../../Forms/CommitForm";
import Web3Utils from "web3-utils";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../../TransactionStatuses";

export default ({contestId, teamId, challengeId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('Jeopardy', 'commitSubmit')
    const submits = useSelector(getJeopardySubmits);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState('');
    useEffect(() => {
        submits.forEach(flag => flag.challengeId === challengeId && flag.sender === drizzleState.account && setFlag(flag.flag))
    }, [submits, challengeId, drizzleState.account])
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <CommitForm data={flag} onSubmit={useCallback(({_data}) => {
                submits.forEach((submit, index) => {
                    if (submit.challengeId === challengeId &&
                        submit.sender === drizzleState.account)
                        dispatch(JeopardyRemove(index));
                })
                const salt = Web3Utils.randomHex(32);
                dispatch(JeopardyAdd({
                    contestId: contestId,
                    teamId: teamId,
                    challengeId: challengeId,
                    flag: _data,
                    salt: salt,
                    sender: drizzleState.account
                }));
                send([[contestId, challengeId, teamId, 0], Web3Utils.soliditySha3(_data, salt)])
            }, [contestId, teamId, challengeId, submits, send, dispatch, drizzleState.account])}/>
        </>
    )
}