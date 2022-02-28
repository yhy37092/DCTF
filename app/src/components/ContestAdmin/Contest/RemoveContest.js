import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../TransactionStatuses'
import RemoveContestForm from '../../Forms/RemoveContestForm'
import {contest} from '../../../MetaData.json'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Contests', 'removes')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveContestForm
                data={useCacheCall(['Contests'], call => (call('Contests', 'getMyContestIds') || []).map(value => call('Contests', 'getContest', parseInt(value)) || contest))}
                onSubmit={useCallback(({_data}) => send(_data), [send])}
            />
        </>
    )
}