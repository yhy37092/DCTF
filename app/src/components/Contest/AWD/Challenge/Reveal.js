import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../../TransactionStatuses'
import {getAWDFlags} from "../../../../reducers/Flag";
import {getAWDSubmits} from "../../../../reducers/Submit";

export default ({contestId, teamId}) => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const revealFlags = useCacheSend('AWD', 'revealFlags')['send']
    const revealFlagStatus = useCacheSend('AWD', 'revealSubmits')['TXObjects']
    const revealSubmits = useCacheSend('AWD', 'revealFlags')['send']
    const revealSubmitStatus = useCacheSend('AWD', 'revealSubmits')['TXObjects']
    const flags = useSelector(getAWDFlags)
    const submits = useSelector(getAWDSubmits)

    function handleReveal() {
        const revealFlag = () => {
            const _challengeIds = []
            const _flags = []
            const _salts = []
            flags.forEach(flag => {
                if (contestId === flag.contestId) {
                    _challengeIds.push(flag.challengeId)
                    _flags.push(flag.flag)
                    _salts.push(flag.salt)
                }
            })
            _challengeIds.length > 0 && revealFlags(contestId, _challengeIds, teamId, _flags, _salts)
        }
        const revealSubmit = () => {
            const _challengeIds = []
            const _targetTeamIds = []
            const _flags = []
            const _salts = []
            submits.forEach(submit => {
                if (contestId === submit.contestId) {
                    _challengeIds.push(submit.challengeId)
                    _targetTeamIds.push(submit.targetTeamId)
                    _flags.push(submit.flag)
                    _salts.push(submit.salt)
                }
            })
            _challengeIds.length > 0 && revealSubmits(contestId, teamId, _challengeIds, _targetTeamIds, _flags, _salts)
        }
        revealFlag()
        revealSubmit()

    }

    return (
        <>
            <TransactionStatuses TXObjects={[...revealFlagStatus, ...revealSubmitStatus]}/>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <i className="fas fa-arrow-circle-up"/>
            </Button>
        </>
    )
}