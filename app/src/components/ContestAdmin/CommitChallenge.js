import React, {useCallback, useEffect, useState} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Tab, Tabs} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {adminAdd, adminRemove, getAdminFlags} from '../../reducers/flags'
import Web3Utils from 'web3-utils'
import CommitForm from '../Forms/CommitForm'
import TransactionStatuses from '../TransactionStatuses'

export default ({contestId, challengeId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Moves', 'commitForAdmin')

    const flags = useSelector(getAdminFlags)
    const dispatch = useDispatch()

    const [flag, setFlag] = useState('');

    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challengeId && setFlag(flag.flag))
    }, [flags, challengeId])

    return (
        <Tabs defaultActiveKey='Flag'>
            <Tab eventKey='Flag' title='Flag'>
                <p/><p/>
                <TransactionStatuses TXObjects={TXObjects}/>
                <CommitForm
                    data={flag}
                    onSubmit={useCallback(({_data}) => {
                        flags.forEach((value, index) => {
                            if (value.challengeId === challengeId)
                                dispatch(adminRemove(index))
                        })
                        const salt = Web3Utils.randomHex(32)
                        dispatch(adminAdd({contestId: contestId, challengeId: challengeId, flag: _data, salt: salt}))
                        send(contestId, challengeId, Web3Utils.soliditySha3(_data, salt))
                    }, [])}
                />
            </Tab>
        </Tabs>
    )
}