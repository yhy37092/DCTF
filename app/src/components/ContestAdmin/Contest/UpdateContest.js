import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../TransactionStatuses'
import {contest} from '../../../MetaData.json'
import UpdateContestForm from '../../Forms/UpdateContestForm'

export default ({contestId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Contests', 'update')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateContestForm
                data={useCacheCall('Contests', 'getContest', contestId) || contest}
                onSubmit={useCallback(({_data}) => send(contestId, _data), [contestId, send])}/>
        </>
    )
}