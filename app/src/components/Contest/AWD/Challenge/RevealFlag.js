import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../../TransactionStatuses'
import {getAWDFlags} from "../../../../reducers/Flag";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({contestId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('AWD', 'revealFlags')
    const flags = useSelector(getAWDFlags)

    function handleReveal() {
        const RevealData = []
        flags.forEach(value => {
            if (contestId === value.contestId &&
                drizzleState.account === value.sender)
                RevealData.push([[contestId, value.challengeId, teamId, 0], value.flag, value.salt])
        })
        RevealData.length > 0 && send(RevealData)
    }

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <FontAwesomeIcon icon={solid("circle-arrow-up")}/>
            </Button>
        </>
    )
}