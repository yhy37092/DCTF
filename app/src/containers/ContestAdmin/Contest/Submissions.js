import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {useParams} from 'react-router-dom'
import SubmissionForm from "../../../components/Forms/SubmissionForm"

export default () => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    const {contestId} = useParams()

    return (
        <SubmissionForm data={useCacheCall(['Moves', 'Teams'], call => {
            const moves = call('Moves', 'gets', contestId) || []
            return moves.map(value => {
                const team = call('Teams', 'teams', value.teamId) || {info: {name: ''}}
                return {
                    id: value.id,
                    info: {
                        flag: value.info.flag,
                        salt: value.info.salt,
                        hash: value.info.hash,
                        name: team.info.name
                    },
                    state: value.state
                }
            })
        })}/>
    )
}
