import React, {useCallback} from "react";
import TransactionStatuses from "../../components/TransactionStatuses";
import {useCacheSend} from "../../hooks/create-use-cache-send";
import NewForm from "./Components/NewContestForm";

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Contests', 'add')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <NewForm
                onSubmit={useCallback(({_data}) => {
                    send(_data)
                }, [send])}/>
        </>
    )
}