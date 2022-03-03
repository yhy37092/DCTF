import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AWDAdd, AWDRemove, getAWDFlags} from "../../../../reducers/Flag";
import CommitForm from "../../../Forms/CommitForm";
import Web3Utils from "web3-utils";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../../TransactionStatuses";

export default ({contestId, challengeId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AWD', 'commitFlag')
    const flags = useSelector(getAWDFlags);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState('');
    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challengeId && setFlag(flag.flag))
    }, [flags, challengeId])
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <CommitForm data={flag} onSubmit={useCallback(({_data}) => {
                flags.forEach((item, index) => {
                    if (item.challengeId === challengeId)
                        dispatch(AWDRemove(index));
                })
                const salt = Web3Utils.randomHex(32);
                dispatch(AWDAdd({
                    contestId: contestId,
                    teamId: teamId,
                    challengeId: challengeId,
                    flag: _data,
                    salt: salt
                }));
                send(contestId, challengeId, teamId, Web3Utils.soliditySha3(_data, salt))
            }, [contestId, challengeId, teamId, flags, send, dispatch])}/>
        </>
    )
}