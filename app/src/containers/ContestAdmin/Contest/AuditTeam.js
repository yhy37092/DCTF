import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {useParams} from 'react-router-dom'
import TransactionStatuses from '../../../components/TransactionStatuses'
import AuditTeamForm from '../../../components/Forms/AuditTeamForm'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'auditTeams')

    const {contestId} = useParams()

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <AuditTeamForm
                data={useCacheCall('Teams', 'gets', contestId) || []}
                onSubmit={useCallback(({_data, result}) => {
                    send(contestId, _data, Array(_data.length).fill(result))
                }, [send, contestId])}/>
        </>
    )
}