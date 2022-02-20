import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {useParams} from 'react-router-dom'
import RemoveChallengeForm from '../../../../components/Forms/RemoveChallengeForm'
import TransactionStatuses from '../../../../components/TransactionStatuses'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'removes')

    const {contestId} = useParams()

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveChallengeForm
                data={useCacheCall('Challenges', 'gets', contestId) || []}
                onSubmit={useCallback(({_data}) => {
                    send(contestId, _data)
                }, [send, contestId])}/>
        </>
    )
}