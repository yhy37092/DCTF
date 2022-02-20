import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useCacheSend} from '../../../hooks/create-use-cache-send'
import TransactionStatuses from '../../../components/TransactionStatuses'
import AuditTeamForm from '../../../components/Forms/AuditTeamForm'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Teams', 'auditTeams')

    const {gets} = drizzle.contracts.Teams.methods
    const {contestId} = useParams()

    const [teamsKey, setTeamsKey] = useState(0)
    const {Teams} = drizzleState.contracts
    const teams = Teams.gets[teamsKey]
    useEffect(() => {
        const teamsKey = gets.cacheCall(contestId)
        setTeamsKey(teamsKey)
    }, [gets, contestId])

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <AuditTeamForm
                data={(teams && teams.value) || []}
                onSubmit={useCallback(({_data, result}) => {
                    send(contestId, _data, Array(_data.length).fill(result))
                }, [send,contestId])}/>
        </>
    )
}