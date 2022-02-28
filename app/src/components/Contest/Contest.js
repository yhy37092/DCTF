import React from "react";
import {contest as defaultContest, team as defaultTeam} from "../../MetaData.json";
import {ContestDetail, TeamDetail} from "../index";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useTranslation} from "react-i18next";
import TransactionStatuses from "../TransactionStatuses";
import ApplyContestForm from "../Forms/ApplyContestForm";
import {Link} from "react-router-dom";
import {after, before} from "../../utils/utils";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <ContestDetail data={useCacheCall('Contests', 'getContest', contestId) || defaultContest}/>

            <Show
                contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}
                team={useCacheCall(['Teams'], call => call('Teams', 'getTeam', parseInt(call('Teams', 'getMyTeamId', contestId) || '0')) || defaultTeam)}
            />
        </>
    )
}

function Show({contest, team}) {
    const {t} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'add')
    return (
        <>
            {before(contest.info.start) && <>
                <TransactionStatuses TXObjects={TXObjects}/>
                {
                    team.state === '0' &&
                    <div align="center">
                        <h3>{t('description.Apply_contest')}</h3>
                        <ApplyContestForm
                            onSubmit={({_data}) => send(contest.id, _data, {value: contest.info.fee})}/>
                    </div>
                }
                {
                    team.state === '1' &&
                    <div align="center">
                        <h3>{t('description.applied')}</h3>
                        <h2><Link
                            to={`ongoing`}>{t('description.Go_to_contest')}</Link>
                        </h2>
                        <h3>{t('description.team_info')}</h3>
                        <TeamDetail data={team}/>
                    </div>
                }
            </>}
            {after(contest.info.start) && before(contest.info.revealEnd) && <>
                {
                    team.state === '0' &&
                    <div align="center">
                        <h3>{t('description.contest_is_ongoing')}</h3>
                    </div>
                }
                {
                    team.state === '1' &&
                    <div align="center">
                        <h3>{t('description.applied')}</h3>
                        <h2><Link
                            to={`ongoing`}>{t('description.Go_to_contest')}</Link>
                        </h2>
                        <h3>{t('description.team_info')}</h3>
                        <TeamDetail data={team}/>
                    </div>
                }
            </>}
            {after(contest.info.revealEnd) && <div align="center">
                <h3>{t('description.contest_end')}</h3>
                <h2><Link
                    to={`/Review/Contest-${contest.id}`}>{t('description.reviewContest')}</Link>
                </h2>
            </div>}
        </>

    )
}