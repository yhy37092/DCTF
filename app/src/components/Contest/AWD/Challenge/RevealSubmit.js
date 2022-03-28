import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../../TransactionStatuses'
import {getAWDSubmits} from "../../../../reducers/Submit";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({contestId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const revealSubmits = useCacheSend('AWD', 'revealSubmits')['send']
    const revealSubmitStatus = useCacheSend('AWD', 'revealSubmits')['TXObjects']
    const submits = useSelector(getAWDSubmits)

    function handleReveal() {
        const _challengeIds = []
        const _targetTeamIds = []
        const _flags = []
        const _salts = []
        submits.forEach(submit => {
            if (contestId === submit.contestId &&
                drizzleState.account === submit.sender) {
                _challengeIds.push(submit.challengeId)
                _targetTeamIds.push(submit.targetTeamId)
                _flags.push(submit.flag)
                _salts.push(submit.salt)
            }
        })
        _challengeIds.length > 0 && revealSubmits(contestId, teamId, _challengeIds, _targetTeamIds, _flags, _salts)
    }

    return (
        <>
            <TransactionStatuses TXObjects={revealSubmitStatus}/>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <FontAwesomeIcon icon={solid("circle-arrow-up")}/>
            </Button>
        </>
    )
}