import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {getJeopardyFlags} from '../../../../reducers/Flag'
import TransactionStatuses from '../../../TransactionStatuses'
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({contestId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('Jeopardy', 'revealFlags')
    const flags = useSelector(getJeopardyFlags)

    function handleReveal() {
        const RevealData = []
        flags.forEach(value => {
            if (contestId === value.contestId &&
                drizzleState.account === value.sender)
                RevealData.push([[contestId, value.challengeId, 0, 0], value.flag, value.salt])
        })
        RevealData.length > 0 && send(RevealData)
    }

    return (
        <>
            <Button variant='outline-secondary' onClick={handleReveal}>
                <FontAwesomeIcon icon={solid("circle-arrow-up")}/>
            </Button>
            <TransactionStatuses TXObjects={TXObjects}/>
        </>
    )
}