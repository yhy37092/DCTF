import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {team as defaultTeam} from "../../../MetaData.json";
import ScoreForm from "../../Forms/ScoreForm";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <ScoreForm
                data={useCacheCall(['Moves', 'Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => ({
                    team: call('Teams', 'getTeam', parseInt(value)) || defaultTeam,
                    score: call('Moves', 'getScore', parseInt(value)) || '0'
                })))}
            />
        </>
    )
}