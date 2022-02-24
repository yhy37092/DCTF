import React, {useCallback} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import TransactionStatuses from '../../components/TransactionStatuses'
import RevokeForm from '../../components/Forms/RevokeForm'

export default ({Role}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'revokeRoles')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RevokeForm
                data={useCacheCall(['AccessContr0l'], call => [...Array(parseInt((call('AccessContr0l', 'getRoleMemberCount', Role) || '0'))).keys()].map(index => call('AccessContr0l', 'getRoleMember', Role, index))) || []}
                onSubmit={useCallback(({_data}) => send(Role, _data), [Role, send])}
            />
        </>
    )
}