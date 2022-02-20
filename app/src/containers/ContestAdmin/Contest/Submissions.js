import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import SubmissionForm from "../../../components/Forms/SubmissionForm";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams()

    const {gets} = drizzle.contracts.Moves.methods
    const [movesKey, setMovesKey] = useState(0)
    const {Moves} = drizzleState.contracts
    const moves = Moves.gets[movesKey]
    useEffect(() => {
        const movesKey = gets.cacheCall(contestId)
        setMovesKey(movesKey)
    }, [gets, contestId])

    const {getSome} = drizzle.contracts.Teams.methods
    const [teamsKey, setTeamsKey] = useState(0)
    const {Teams} = drizzleState.contracts
    const teams = Teams.getSome[teamsKey]
    useEffect(() => {
        const ids = []
        moves && moves.value.forEach(move => ids.push(move.teamId))
        const teamsKey = getSome.cacheCall(ids)
        setTeamsKey(teamsKey)
    }, [getSome, moves])

    return (
        <SubmissionForm data={(moves && teams && moves.value.map(
            (value, index) => (
                {
                    id: value.id,
                    info: {
                        flag: value.info.flag,
                        salt: value.info.salt,
                        hash: value.info.hash,
                        name: teams.value[index].info.name
                    },
                    state: value.state
                }
            )
        )) || []}/>
    )
}