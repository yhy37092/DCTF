import React, {useCallback} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import Web3Utils from 'web3-utils'
import TransactionStatuses from '../TransactionStatuses'
import RevokeForm from '../Forms/RevokeForm'

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'revokeRoles')
    const CONTEST_ADMIN = Web3Utils.keccak256('CONTEST_ADMIN')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RevokeForm
                data={useCacheCall('AccessContr0l','getRoleMembers',CONTEST_ADMIN)|| []}
                onSubmit={useCallback(({_data}) => {
                    send(CONTEST_ADMIN, _data)
                }, [CONTEST_ADMIN, send])}/>
        </>
    )
}