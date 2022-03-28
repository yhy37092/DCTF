import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from "react-bootstrap";
import TransactionStatuses from "../../TransactionStatuses";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export default ({contestId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AWD', 'updateScore')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <Button variant='outline-secondary' onClick={() => send(contestId)}>
                <FontAwesomeIcon icon={solid('sync')}/>
            </Button>
        </>
    )
}