import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {team as defaultTeam} from "../../../MetaData.json";
import Table from "../../Table";
import TeamNamePreview from "../../Team/TeamNamePreview";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <Table
                data={useCacheCall(['Moves', 'Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => {
                    const team = call('Teams', 'getTeam', parseInt(value)) || defaultTeam
                    const score = call('Moves', 'getScore', parseInt(value)) || '0'
                    return ({
                        Id: team.id,
                        Name: <TeamNamePreview team={team}/>,
                        Score: score
                    })
                }))}
            />
        </>
    )
}