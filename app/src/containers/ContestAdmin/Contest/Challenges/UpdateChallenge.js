import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {useParams} from 'react-router-dom'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import UpdateChallengeForm from '../../../../components/Forms/UpdateChallengeForm'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'update')

    const {contestId, challengeId} = useParams()

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateChallengeForm
                data={useCacheCall('Challenges', 'challenges', challengeId) || {
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