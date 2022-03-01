import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {challenge as defaultChallenge, move as defaultMove, team as defaultTeam} from '../../../MetaData.json'
import {toMoveState} from "../../../utils/utils";
import Table from "../../Table";
import ChallengeNamePreview from "../../Challenge/ChallengeNamePreview";
import TeamNamePreview from "../../Team/TeamNamePreview";
import MoveHashPreview from "../../Move/MoveHashPreview";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <Table
            data={useCacheCall(['Moves', 'Teams', 'Challenges'], call => ((call('Moves', 'getContestSubmitIds', contestId) || []).flatMap(moveId => {
                const move = call('Moves', 'getMove', parseInt(moveId)) || defaultMove
                const team = call('Teams', 'getTeam', parseInt(move.teamId)) || defaultTeam
                const challenge = call('Challenges', 'getChallenge', parseInt(move.challengeId)) || defaultChallenge
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