import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../components/TransactionStatuses'
import RemoveContestForm from '../../components/Forms/RemoveContestForm'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('Contests', 'removes')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveContestForm
                data={useCacheCall('Contests', 'gets', drizzleState.account) || []}
                onSubmit={useCallback(({_data}) => {
                    send(_data)
                }, [send])}/>
        </>
    )
}