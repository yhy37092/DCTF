import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import RemoveChallengeForm from '../../../../components/Forms/RemoveChallengeForm'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import {challenge} from '../../../../MetaData.json'

export default ({contestId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'removes')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveChallengeForm
                data={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
                onSubmit={useCallback(({_data}) => send(contestId, _data), [send, contestId])}/>
        </>
    )
}