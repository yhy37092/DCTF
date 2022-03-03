import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {team as teamDefault} from '../../MetaData.json'
import {toTeamState} from "../../utils/utils";
import Table from "../Table";
import TeamNamePreview from "./TeamNamePreview";

export default ({contestId, filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <Table
            filter={filter}
            data={useCacheCall(['Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => {
                const team = call('Teams', 'getTeam', value) || teamDefault
                return ({
                    Id: team.id,
                    Name: <TeamNamePreview team={team}/>,
                    Captain: team.info.captain,
                    State: toTeamState(team.state)
                })
            }))}
        />
    )
}