import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {team as defaultTeam} from "../../../MetaData.json";
import Table from "../../Table";
import TeamNamePreview from "../../Team/TeamNamePreview";

export default ({contestId,filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <Table
                filter={filter}
                data={useCacheCall(['Jeopardy', 'Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => {
                    const team = call('Teams', 'getTeam', parseInt(value)) || defaultTeam
                    const score = call('Jeopardy', 'getScore', parseInt(value)) || '0'
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