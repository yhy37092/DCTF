import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import {challenge} from '../../../../MetaData.json'
import UpdateAWDChallengeForm from "../../../Forms/AWD/UpdateChallengeForm";

export default ({contestId, challengeId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'update')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateAWDChallengeForm
                data={useCacheCall('Challenges', 'getChallenge', challengeId) || challenge}
                onSubmit={useCallback(({_data}) => send(contestId, challengeId, _data), [send, contestId, challengeId])}/>
        </>
    )
}