import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {challenge as defaultChallenge, move as defaultMove} from '../../../MetaData.json'
import Table from "../../Table";
import {toMoveState} from "../../../utils/utils";
import ChallengeNamePreview from "../../Challenge/ChallengeNamePreview";
import MoveHashPreview from "../../Move/MoveHashPreview";

export default ({contestId,filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <Table
            filter={filter}
            data={useCacheCall(['Jeopardy', 'Moves', 'Challenges'], call => ((call('Jeopardy', 'getContestFlagIds', contestId) || []).flatMap(moveId => {
                const move = call('Moves', 'getMove', parseInt(moveId)) || defaultMove
                const challenge = call('Challenges', 'getChallenge', parseInt(move.challengeId)) || defaultChallenge
                return ({
                    Id: move.id,
                    ChallengeName: <ChallengeNamePreview challenge={challenge}/>,
                    Hash: <MoveHashPreview move={move}/>,
                    Flag: move.info.flag,
                    State: toMoveState(move.state)
                })
            })))}
        />
    )
}