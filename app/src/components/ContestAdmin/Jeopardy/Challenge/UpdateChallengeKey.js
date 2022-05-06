import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from '../../../TransactionStatuses'
import KeyForm from "../../../Forms/Jeopardy/KeyForm";

export default ({contestId, challengeId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'addKey')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <KeyForm
                onSubmit={useCallback(({_data}) => {
                    send(contestId,challengeId,_data)
                }, [send,contestId,challengeId])}
            />
        </>
    )
}