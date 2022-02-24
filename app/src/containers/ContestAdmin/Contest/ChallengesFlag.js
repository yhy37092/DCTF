import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {challenge as defaultChallenge, move as defaultMove} from '../../../MetaData.json'
import ChallengeFlagForm from "../../../components/Forms/ChallengeFlagForm";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <ChallengeFlagForm
            data={useCacheCall(['Moves', 'Challenges'], call => ((call('Moves', 'getContestAnswerIds', contestId) || []).flatMap(moveId => [call('Moves', 'getMove', parseInt(moveId)) || defaultMove].map(move => ({
                move: move,
                challenge: call('Challenges', 'getChallenge', parseInt(move.challengeId)) || defaultChallenge
            })))))}
        />
    )
}