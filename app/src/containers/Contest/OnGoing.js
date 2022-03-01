import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {contest as defaultContest} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Jeopardy from './Jeopardy/Contest'
import AWD from './AWD/Contest'

export default () => {
    const {contestId} = useParams();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">{t('description.Contests')}</Link>
                        <Link to={`/Contests/Contest-${contestId}`}
                              className="breadcrumb-item">{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.OnGoing')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Show
                        contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}
                        teamId={parseInt(useCacheCall("Teams", 'getMyTeamId', contestId) || '0')}
                    />
                </Col>
            </Row>
        </>
    )
}

function Show({contest, teamId}) {
    return (
        <>
            {contest.info.contestType === 'Jeopardy' && <Jeopardy contest={contest} teamId={teamId}/>}
            {contest.info.contestType === 'AWD' && <AWD contest={contest} teamId={teamId}/>}
        </>
    )

}