import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import CommitChallenge from "../../../../../components/ContestAdmin/Jeopardy/Challenge/CommitChallenge";
import UpdateChallenge from "../../../../../components/ContestAdmin/Jeopardy/Challenge/UpdateChallenge";
import React from "react";

export default () => {
    const {t} = useTranslation();
    const {contestId, challengeId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`}
                              className='breadcrumb-item'>{t('description.Challenges')}</Link>
                        <Breadcrumb.Item active>{t('description.Challenge')}-{challengeId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Challenge_Detail')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CommitChallenge contestId={contestId} challengeId={challengeId}/>
                </Col>
                <Col>
                    <UpdateChallenge contestId={contestId} challengeId={challengeId}/>
                </Col>
            </Row>
        </>

    )
}