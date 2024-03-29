import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import UpdateChallengeForm from '../../../Forms/Jeopardy/UpdateChallengeForm'
import {challenge} from '../../../../MetaData.json'

export default ({contestId, challengeId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'update')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateChallengeForm
                data={useCacheCall('Challenges', 'challenges', challengeId) || challenge}
                onSubmit={useCallback(({_data}) => send(contestId, challengeId, _data), [send, contestId, challengeId])}/>
        </>
    )
}