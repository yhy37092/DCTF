import React, {useCallback, useEffect, useState} from "react";
import Web3Utils from "web3-utils";
import TransactionStatuses from "../../components/TransactionStatuses";
import RevokeForm from "./Components/RevokeForm";
import {useCacheSend} from "../../hooks/create-use-cache-send";

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'AccessContr0l', 'revokeRoles')
    const CONTEST_ADMIN = Web3Utils.keccak256("CONTEST_ADMIN");
    const {getRoleMembers} = drizzle.contracts.AccessContr0l.methods;
    const {AccessContr0l} = drizzleState.contracts;

    const [adminsKey, setAdminsKey] = useState(null);
    const admins = AccessContr0l.getRoleMembers[adminsKey]
    useEffect(() => {
        const adminsKey = getRoleMembers.cacheCall(CONTEST_ADMIN);
        setAdminsKey(adminsKey);
    }, [getRoleMembers, CONTEST_ADMIN])


    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RevokeForm
                data={(admins && admins.value) || []}
                onSubmit={useCallback(({_data}) => {
                    send(CONTEST_ADMIN, _data)
                }, [CONTEST_ADMIN, send])}/>
        </>
    )
}