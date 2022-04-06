import React, {useCallback, useEffect, useState} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from 'react-redux'
import {getJeopardyFlags, JeopardyAdd, JeopardyRemove} from '../../../../reducers/Flag'
import Web3Utils from 'web3-utils'
import CommitForm from '../../../Forms/CommitForm'
import TransactionStatuses from '../../../TransactionStatuses'

export default ({contestId, challengeId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('Jeopardy', 'commitFlag')

    const flags = useSelector(getJeopardyFlags)
    const dispatch = useDispatch()

    const [flag, setFlag] = useState('');

    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challengeId && flag.sender === drizzleState.account && setFlag(flag.flag))
    }, [flags, challengeId, drizzleState.account])

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <CommitForm
                data={flag}
                onSubmit={useCallback(({_data}) => {
                    flags.forEach((flag, index) => {
                        if (flag.challengeId === challengeId &&
                            flag.sender === drizzleState.account)
                            dispatch(JeopardyRemove(index))
                    })
                    const salt = Web3Utils.randomHex(32)
                    dispatch(JeopardyAdd(
                        {
                            contestId: contestId,
                            challengeId: challengeId,
                            flag: _data,
                            salt: salt,
                            sender: drizzleState.account
                        }
                    ))
                    send([[contestId, challengeId, 0, 0], Web3Utils.soliditySha3(_data, salt)])
                }, [contestId, challengeId, dispatch, flags, send, drizzleState.account])}
            />
        </>
    )
}