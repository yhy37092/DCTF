import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../../components/TransactionStatuses'
import NewChallengeForm from '../../../../components/Forms/NewChallengeForm'

export default ({contestId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'add')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <NewChallengeForm
                onSubmit={useCallback(({_data}) => send(contestId, _data), [send, contestId])}/>
        </>
    )
}