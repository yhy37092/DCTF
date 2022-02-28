import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TeamsForm from '../../Forms/TeamsForm'
import {team} from '../../../MetaData.json'

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            <TeamsForm
                data={useCacheCall(['Teams'], call => (call('Teams', 'getContestTeamIds', contestId) || []).map(value => call('Teams', 'getTeam', value) || team))}
            />
        </>
    )
}