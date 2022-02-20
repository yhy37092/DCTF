import React, {useCallback, useEffect, useState} from 'react'
import TransactionStatuses from '../../../components/TransactionStatuses'
import {useCacheSend} from '../../../hooks/create-use-cache-send'
import {useParams} from 'react-router-dom'
import UpdateContestForm from '../../../components/Forms/UpdateContestForm'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Contests', 'update')

    const {contestId} = useParams()

    const {contests} = drizzle.contracts.Contests.methods

    const [contestKey, setContestKey] = useState(null)
    const {Contests} = drizzleState.contracts
    const contest = Contests.contests[contestKey]
    useEffect(() => {
        const contestKey = contests.cacheCall(contestId)
        setContestKey(contestKey)
    }, [contests, contestId])

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateContestForm
                data={(contest && contest.value) || {
                    info: {
                        contestType: '',
                        name: '',
                        fee: 0,
                        start: 0,
                        end: 0,
                        message: ''
                    }
                }}
                onSubmit={useCallback(({_data}) => {
                    send(contestId,_data)
                }, [contestId,send])}/>
        </>
    )
}