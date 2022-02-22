import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import SubmissionForm from "../../../components/Forms/SubmissionForm"
import {challenge as defaultChallenge, move as defaultMove, team as defaultTeam} from '../../../MetaData.json'

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <SubmissionForm
            data={useCacheCall(['Moves', 'Teams', 'Challenges'], call => ((call('Moves', 'getContestSubmitIds', contestId) || []).flatMap(moveId => [call('Moves', 'getMove', parseInt(moveId)) || defaultMove].map(move => ({
                move: move,
                team: call('Teams', 'getTeam', parseInt(move.teamId)) || defaultTeam,
                challenge: call('Challenges', 'getChallenge', parseInt(move.challengeId)) || defaultChallenge
            })))))}
        />
    )
}