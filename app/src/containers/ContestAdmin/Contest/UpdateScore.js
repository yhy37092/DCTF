import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from "react-bootstrap";
import TransactionStatuses from "../../../components/TransactionStatuses";

export default ({contestId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Moves', 'updateScore')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <Button variant='outline-secondary' onClick={() => send(contestId)}>
                <i className="fas fa-sync"/>
            </Button>
        </>
    )
}