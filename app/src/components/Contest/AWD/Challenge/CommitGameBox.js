import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AWDAdd, AWDRemove, getAWDFlags} from "../../../../reducers/Flag";
import CommitForm from "../../../Forms/CommitForm";
import Web3Utils from "web3-utils";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../../TransactionStatuses";

export default ({contestId, challengeId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('AWD', 'commitFlag')
    const flags = useSelector(getAWDFlags);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState('');
    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challengeId && flag.sender === drizzleState.account && setFlag(flag.flag))
    }, [flags, challengeId, drizzleState.account])
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <CommitForm data={flag} onSubmit={useCallback(({_data}) => {
                flags.forEach((flag, index) => {
                    if (flag.challengeId === challengeId &&
                        flag.sender === drizzleState.account)
                        dispatch(AWDRemove(index));
                })
                const salt = Web3Utils.randomHex(32);
                dispatch(AWDAdd({
                    contestId: contestId,
                    teamId: teamId,
                    challengeId: challengeId,
                    flag: _data,
                    salt: salt,
                    sender: drizzleState.account
                }));
                send([[contestId, challengeId, teamId, 0], Web3Utils.soliditySha3(_data, salt)])
            }, [contestId, challengeId, teamId, flags, send, dispatch, drizzleState.account])}/>
        </>
    )
}