import React, {useCallback} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {adminAdd, adminRemove, getAdminFlags} from '../../../../reducers/flags'
import Web3Utils from 'web3-utils'
import {useParams} from 'react-router-dom'
import {useCacheSend} from '../../../../hooks/create-use-cache-send'
import CommitForm from '../../../../components/Forms/CommitForm'
import TransactionStatuses from '../../../../components/TransactionStatuses'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Moves', 'commitForAdmin')

    const {contestId} = useParams()
    const {challengeId} = useParams()

    const flags = useSelector(getAdminFlags)
    const dispatch = useDispatch()

    return (
        <Tabs defaultActiveKey='Flag'>
            <Tab eventKey='Flag' title='Flag'>
                <p/><p/>
                <TransactionStatuses TXObjects={TXObjects}/>
                <CommitForm
                    data={''}
                    onSubmit={useCallback(({_data}) => {
                        flags.forEach((value, index) => {
                            if (value.challengeId === challengeId)
                                dispatch(adminRemove(index))
                        })
                        const salt = Web3Utils.randomHex(32)
                        dispatch(adminAdd({contestId: contestId, challengeId: challengeId, flag: _data, salt: salt}))
                        send(contestId, challengeId, Web3Utils.soliditySha3(_data, salt))
                    }, [send, contestId, challengeId, dispatch, flags])}
                />
            </Tab>
        </Tabs>
    )
}