import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../TransactionStatuses'
import NewContestForm from '../Forms/NewContestForm'

export default () => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Contests', 'add')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <NewContestForm onSubmit={useCallback(({_data}) => send(_data), [send])}/>
        </>
    )
}