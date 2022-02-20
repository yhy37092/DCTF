import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../TransactionStatuses'
import AuditTeamForm from '../Forms/AuditTeamForm'

export default ({contestId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'auditTeams')

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