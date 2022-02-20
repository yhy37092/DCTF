import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {getAdminFlags} from '../../../../reducers/flags'
import {useCacheSend} from '../../../../hooks/create-use-cache-send'
import TransactionStatuses from '../../../../components/TransactionStatuses'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Moves', 'revealForAdmins')
    const {contestId} = useParams()
    const flags = useSelector(getAdminFlags)

    function handleReveal() {
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
        _challengeIds.length > 0 && send(contestId, _challengeIds, _flags, _salts)
    }

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <h1 align='center'>Challenges
                <Link to={`/ContestAdmin/Contest-${contestId}/Challenges/New`}>
                    <Button
                        variant='outline-secondary'><i
                        className='btn-fa fas fa-plus-circle'/></Button></Link>
                <Button variant='outline-secondary' onClick={handleReveal}>
                    <i className='fas fa-arrow-circle-up'/>
                </Button>
            </h1>
        </>
    )
}