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
        _challengeIds.length > 0 && send(contestId, _challengeIds, _flags, _salts)
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