import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import RemoveChallengeForm from '../Forms/RemoveChallengeForm'
import TransactionStatuses from '../TransactionStatuses'

export default ({contestId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'removes')

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