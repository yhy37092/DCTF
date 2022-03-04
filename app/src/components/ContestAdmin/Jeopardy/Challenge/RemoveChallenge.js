import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import {challenge as defaultChallenge} from '../../../../MetaData.json'
import RemoveForm from "../../../RemoveForm";
import {Link} from "react-router-dom";

export default ({contestId,filter}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'removes')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveForm
                filter={filter}
                data={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => {
                    const challenge = call('Challenges', 'getChallenge', parseInt(value)) || defaultChallenge
                    return ({
                        Id: challenge.id,
                        Name: <Link to={`Challenge-${challenge.id}`}>{challenge.info.name}</Link>,
                        Category: challenge.info.category,
                        Value: challenge.info.value
                    })
                }))}
                onSubmit={useCallback(({selectedData}) => {
                    const ids = [];
                    selectedData.forEach(value => ids.push(value.Id));
                    send(contestId, ids)
                }, [send,contestId])}/>
        </>
    )
}