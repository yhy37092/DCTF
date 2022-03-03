import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {challenge as defaultChallenge, move as defaultMove, team as defaultTeam} from '../../../MetaData.json'
import Table from "../../Table";
import {toMoveState} from "../../../utils/utils";
import ChallengeNamePreview from "../../Challenge/ChallengeNamePreview";
import MoveHashPreview from "../../Move/MoveHashPreview";
import TeamNamePreview from "../../Team/TeamNamePreview";

export default ({contestId,filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <Table
            filter={filter}
            data={useCacheCall(['AWD', 'Moves', 'Challenges', 'Teams'], call => ((call('AWD', 'getContestFlagIds', contestId) || []).flatMap(moveId => {
                const move = call('Moves', 'getMove', parseInt(moveId)) || defaultMove
                const challenge = call('Challenges', 'getChallenge', parseInt(move.challengeId)) || defaultChallenge
                const team = call('Teams', 'getTeam', parseInt(move.teamId)) || defaultTeam
                return ({
                    Id: move.id,
                    ChallengeName: <ChallengeNamePreview challenge={challenge}/>,
                    TeamName: <TeamNamePreview team={team}/>,
                    Hash: <MoveHashPreview move={move}/>,
                    Flag: move.info.flag,
                    State: toMoveState(move.state)
                })
            })))}
        />
    )
}