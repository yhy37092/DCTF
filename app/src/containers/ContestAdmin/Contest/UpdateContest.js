import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../components/TransactionStatuses'

import {useParams} from 'react-router-dom'
import UpdateContestForm from '../../../components/Forms/UpdateContestForm'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Contests', 'update')

    const {contestId} = useParams()

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateContestForm
                data={useCacheCall('Contests', 'contests', contestId) || {
                    info: {
                        contestType: '',
                        name: '',
                        fee: 0,
                        start: 0,
                        end: 0,
                        message: ''
                    }
                }}
                onSubmit={useCallback(({_data}) => {
                    send(contestId,_data)
                }, [contestId,send])}/>
        </>
    )
}