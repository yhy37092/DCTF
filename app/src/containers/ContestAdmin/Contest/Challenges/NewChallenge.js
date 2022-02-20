import React, {useCallback} from 'react'
import {useParams} from 'react-router-dom'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import NewChallengeForm from '../../../../components/Forms/NewChallengeForm'
import {useCacheSend} from '../../../../hooks/create-use-cache-send'

export default props => {
    const {drizzle, drizzleState} = props
    const {send, TXObjects} = useCacheSend(drizzle, drizzleState, 'Challenges', 'add')

    const {contestId} = useParams()

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <NewChallengeForm
                onSubmit={useCallback(({_data}) => {
                    send(contestId, _data)
                }, [send,contestId])}/>
        </>
    )
}