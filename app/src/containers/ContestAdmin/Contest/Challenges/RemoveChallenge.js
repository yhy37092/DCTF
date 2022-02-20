import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import RemoveChallengeForm from '../../../../components/Forms/RemoveChallengeForm'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import {useCacheSend} from '../../../../hooks/create-use-cache-send'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Challenges', 'removes')

    const {gets} = drizzle.contracts.Challenges.methods
    const {contestId} = useParams()

    const [challengesKey, setChallengesKey] = useState(0)
    const {Challenges} = drizzleState.contracts
    const challenges = Challenges.gets[challengesKey]
    useEffect(() => {
        const challengesKey = gets.cacheCall(contestId)
        setChallengesKey(challengesKey)
    }, [gets, contestId])

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveChallengeForm
                data={(challenges && challenges.value) || []}
                onSubmit={useCallback(({_data}) => {
                    send(contestId, _data)
                }, [send,contestId])}/>
        </>
    )
}