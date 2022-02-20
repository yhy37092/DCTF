import React, {useCallback, useEffect, useState} from 'react'
import TransactionStatuses from '../../components/TransactionStatuses'
import {useCacheSend} from '../../hooks/create-use-cache-send'
import RemoveContestForm from '../../components/Forms/RemoveContestForm'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Contests', 'removes')
    const {gets} = drizzle.contracts.Contests.methods

    const [contestsKey, setContestsKey] = useState(0)
    const {Contests} = drizzleState.contracts
    const contests = Contests.gets[contestsKey]
    useEffect(() => {
        const contestsKey = gets.cacheCall(drizzleState.accounts[0])
        setContestsKey(contestsKey)
    }, [gets,drizzleState.accounts])


    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveContestForm
                data={(contests && contests.value) || []}
                onSubmit={useCallback(({_data}) => {
                    send(_data)
                }, [send])}/>
        </>
    )
}