import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../TransactionStatuses'
import {contest as defaultContest} from '../../../MetaData.json'
import RemoveForm from "../../RemoveForm";
import {toContestState, toDate, toEther} from "../../../utils/utils";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default () => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Contests', 'removes')
    const {t} = useTranslation();
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveForm
                data={useCacheCall(['Contests'], call => (call('Contests', 'getMyContestIds') || []).map(value => {
                    const contest = call('Contests', 'getContest', parseInt(value)) || defaultContest
                    return {
                        Id: contest.id,
                        Name: <Link to={`Contest-${contest.id}`}>{contest.info.name}</Link>,
                        Type: t(`description.${contest.info.contestType}`),
                        Fee: `${toEther(contest.info.fee)} ether`,
                        Start: toDate(contest.info.start),
                        End: toDate(contest.info.commitEnd),
                        State: toContestState(contest.state)
                    }
                }))}
                onSubmit={useCallback(({selectedData}) => {const ids = [];selectedData.forEach(value => ids.push(value.Id));send(ids)}, [send])}
            />
        </>
    )
}