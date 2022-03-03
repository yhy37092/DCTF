import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getJeopardySubmits, JeopardyAdd, JeopardyRemove} from "../../../../reducers/Submit";
import CommitForm from "../../../Forms/CommitForm";
import Web3Utils from "web3-utils";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../../TransactionStatuses";

export default ({contestId, teamId, challengeId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Jeopardy', 'commitSubmit')
    const submits = useSelector(getJeopardySubmits);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState('');
    useEffect(() => {
        submits.forEach(flag => flag.challengeId === challengeId && setFlag(flag.flag))
    }, [submits, challengeId])
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <CommitForm data={flag} onSubmit={useCallback(({_data}) => {
                submits.forEach((item, index) => {
                    if (item.challengeId === challengeId)
                        dispatch(JeopardyRemove(index));
                })
                const salt = Web3Utils.randomHex(32);
                dispatch(JeopardyAdd({
                    contestId: contestId,
                    teamId: teamId,
                    challengeId: challengeId,
                    flag: _data,
                    salt: salt
                }));
                send(contestId, challengeId, teamId, Web3Utils.soliditySha3(_data, salt))
            }, [contestId, teamId, challengeId, submits, send, dispatch])}/>
        </>
    )
}