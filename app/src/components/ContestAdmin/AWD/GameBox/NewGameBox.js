import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import {challenge as defaultChallenge, team as teamDefault} from '../../../../MetaData.json'
import NewENVForm from "../../../Forms/AWD/NewGameBoxForm";

export default ({contestId}) => {
    const {useCacheCall, useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('GameBoxes', 'add')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <NewENVForm
                teams={useCacheCall(['Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => call('Teams', 'getTeam', value) || teamDefault))}
                challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || defaultChallenge))}
                onSubmit={useCallback(({challengeId,teamId,_data}) => send(contestId,challengeId,teamId,_data), [send, contestId])}/>
        </>
    )
}