import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import RevealChallenge from "./RevealChallenge";
import RemoveChallenge from "./RemoveChallenge";
import NewChallenge from "./NewChallenge";
import CommitChallenge from "./CommitChallenge";
import UpdateChallenge from "./UpdateChallenge";
import {useTranslation} from "react-i18next";

export default () => {

    return (
        <Routes>
            <Route path={`/`} element={<MainPage />}/>
            <Route path={`/Challenge-:challengeId`} element={<Update />}/>
            <Route path={`/New`} element={<New />}/>
        </Routes>
    )
}

function MainPage() {
    const {t, i18n} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.Challenges')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RevealChallenge contestId={contestId}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveChallenge contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}

function New() {
    const {t, i18n} = useTranslation();
    const {contestId} = useParams()

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
                        <Breadcrumb.Item active>{t('description.New')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Create_Challenge')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewChallenge contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}

function Update() {
    const {t, i18n} = useTranslation();
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