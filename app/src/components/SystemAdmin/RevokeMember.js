import React, {useCallback} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import TransactionStatuses from '../TransactionStatuses'
import RemoveForm from "../RemoveForm";

export default ({Role}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'revokeRoles')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveForm
                data={useCacheCall(['AccessContr0l'], call => [...Array(parseInt((call('AccessContr0l', 'getRoleMemberCount', Role) || '0'))).keys()].map(index => {
                    const address = call('AccessContr0l', 'getRoleMember', Role, index) || ''
                    return ({
                        Account: address
                    })
                })) || []}
                onSubmit={useCallback(({selectedData}) => {
                    const ids = [];
                    selectedData.forEach(value => ids.push(value.Account));
                    send(Role, ids)
                }, [send, Role])}
            />
        </>
    )
}