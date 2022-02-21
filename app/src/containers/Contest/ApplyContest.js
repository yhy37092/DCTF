import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {TeamDetail} from "../../components";
import ApplyContestForm from "../../components/Forms/ApplyContestForm";
import TransactionStatuses from "../../components/TransactionStatuses";
import {useTranslation} from "react-i18next";

export default ({contest, team}) => {
    const {t, i18n} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'applyContest')

    function handleApply({_data}) {
        send(contest.id, _data, {value: contest.info.fee})
    }

    return (
        <>
            <Row>
                <Col>
                    <TransactionStatuses TXObjects={TXObjects}/>
                    {team.state === '0' ? (
                        <div align="center">
                            <h3>{t('description.Apply_contest')}</h3>
                            <ApplyContestForm onSubmit={handleApply}/>
                        </div>
                    ) : null}
                    {team.state === '1' ? (
                        <div align="center">
                            <h3>{t('description.waiting_for_approving')}</h3>
                            <h3>{t('description.team_info')}</h3>
                            <TeamDetail data={team}/>
                        </div>
                    ) : null}
                    {team.state === '2' ? (
                        <div align="center">
                            <h3>{t('description.approved')}</h3>
                            <h2><Link to={`/Contests/Contest-${contest.id}/ongoing`}>{t('description.Go_to_contest')}</Link></h2>
                            <h3>{t('description.team_info')}</h3>
                            <TeamDetail data={team}/>
                        </div>
                    ) : null}
                    {team.state === '3' ? (<div align="center">
                        <h3>{t('description.apply_rejected')}</h3>
                        <h3>{t('description.can_re_apply')}</h3>
                        <h2>{t('description.team_info')}</h2>
                        <TeamDetail data={team}/>
                        <ApplyContestForm onSubmit={handleApply}/>
                    </div>) : null}
                </Col>
            </Row>
        </>

    );
};