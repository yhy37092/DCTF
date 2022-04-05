import React from "react";
import {contest as defaultContest, team as defaultTeam} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {after, before} from "../../utils/utils";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {ContestDetail, TeamDetail} from "../../components";
import ApplyContestForm from "../../components/Forms/ApplyContestForm";
import TransactionStatuses from "../../components/TransactionStatuses";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">{t('description.Contests')}</Link>
                        <Breadcrumb.Item active>{t('description.Jeopardy')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align="center">{t('description.Jeopardy')}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ContestDetail
                        contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Apply
                        contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}
                        team={useCacheCall(['Teams'], call => call('Teams', 'getTeam', parseInt(call('Teams', 'getMyTeamId', contestId) || '0')) || defaultTeam)}/>
                </Col>
            </Row>
        </>
    )
}

function Apply({contest, team}) {
    const {t} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
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
                            onSubmit={({_data}) => send(contest.id, _data, {value: contest.info.fee})}
                            sender={drizzleState.account}
                        />
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
            {after(contest.info.start) && before(contest.info.end) && <>
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
            {after(parseInt(contest.info.end) + parseInt(contest.info.revealTime)) && <div align="center">
                <h3>{t('description.contest_end')}</h3>
                <h2><Link
                    to={`/Review/Contest-${contest.id}`}>{t('description.reviewContest')}</Link>
                </h2>
            </div>}
        </>

    )
}