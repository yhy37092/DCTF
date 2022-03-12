import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../../TransactionStatuses'
import {getJeopardySubmits} from "../../../../reducers/Submit";

export default ({contestId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('Jeopardy', 'revealSubmits')
    const submits = useSelector(getJeopardySubmits)

    function handleReveal() {
        const _challengeIds = []
        const _flags = []
        const _salts = []
        submits.forEach(flag => {
            if (contestId === flag.contestId &&
                drizzleState.accounts === flag.sender) {
                _challengeIds.push(flag.challengeId)
                _flags.push(flag.flag)
                _salts.push(flag.salt)
            }
        })
        _challengeIds.length > 0 && send(contestId, _challengeIds, teamId, _flags, _salts)
    }

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <i className="fas fa-arrow-circle-up"/>
            </Button>
        </>
    )
}