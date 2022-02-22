import React, {useCallback} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../components/TransactionStatuses";
import {useTranslation} from "react-i18next";
import {contest as defaultContest, team as defaultTeam} from '../../MetaData.json'
import ApplyContestForm from "../../components/Forms/ApplyContestForm";
import {Link} from "react-router-dom";
import {TeamDetail} from "../../components";

export default ({contestId}) => {
    const {t} = useTranslation();
    const {useCacheCall, useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'add')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            {
                useCacheCall(['Contests', 'Teams'], call => {
                    const contest = call('Contests', 'getContest', contestId) || defaultContest
                    const team = call('Teams', 'getTeam', parseInt(call('Teams', 'getMyTeamId', contestId) || '0')) || defaultTeam
                    if (team.state === '0') return (
                        <div align="center">
                            <h3>{t('description.Apply_contest')}</h3>
                            <ApplyContestForm
                                onSubmit={useCallback(({_data}) => send(contestId, _data, {value: contest.info.fee}), [contest])}/>
                        </div>
                    )
                    else return (
                        <div align="center">
                            <h3>{t('description.applied')}</h3>
                            <h2><Link
                                to={`/Contests/Contest-${contest.id}/ongoing`}>{t('description.Go_to_contest')}</Link>
                            </h2>
                            <h3>{t('description.team_info')}</h3>
                            <TeamDetail data={team}/>
                        </div>
                    )
                })
            }
        </>

    );
};