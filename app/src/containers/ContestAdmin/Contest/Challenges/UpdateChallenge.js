import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import UpdateChallengeForm from '../../../../components/Forms/UpdateChallengeForm'
import {useCacheSend} from '../../../../hooks/create-use-cache-send'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Challenges', 'update')

    const {contestId} = useParams()
    const {challengeId} = useParams()

    const {challenges} = drizzle.contracts.Challenges.methods
    const [challengeKey, setChallengeKey] = useState(0)
    const {Challenges} = drizzleState.contracts
    const challenge = Challenges.challenges[challengeKey]
    useEffect(() => {
        const challengeKey = challenges.cacheCall(challengeId)
        setChallengeKey(challengeKey)
    }, [challenges, challengeId])

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateChallengeForm
                data={(challenge && challenge.value) || {
                    info: {
                        challengeType: '',
                        name: '',
                        category: '',
                        message: '',
                        connectionInfo: '',
                        file: '',
                        hint: '',
                        value: 0
                    }
                }}
                onSubmit={useCallback(({_data}) => {
                    send(contestId, challengeId, _data)
                }, [send, contestId, challengeId])}/>
        </>
    )
}