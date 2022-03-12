import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../../TransactionStatuses'
import {getAWDFlags} from "../../../../reducers/Flag";

export default ({contestId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const revealFlags = useCacheSend('AWD', 'revealFlags')['send']
    const revealFlagStatus = useCacheSend('AWD', 'revealSubmits')['TXObjects']
    const flags = useSelector(getAWDFlags)

    function handleReveal() {
        const _challengeIds = []
        const _flags = []
        const _salts = []
        flags.forEach(flag => {
            if (contestId === flag.contestId &&
                drizzleState.account === flag.sender) {
                _challengeIds.push(flag.challengeId)
                _flags.push(flag.flag)
                _salts.push(flag.salt)
            }
        })
        _challengeIds.length > 0 && revealFlags(contestId, _challengeIds, teamId, _flags, _salts)
    }

    return (
        <>
            <TransactionStatuses TXObjects={revealFlagStatus}/>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <i className="fas fa-arrow-circle-up"/>
            </Button>
        </>
    )
}