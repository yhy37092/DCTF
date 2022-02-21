import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {ContestAdminNavBar, NoMatch} from '../../../components'
import Challenges from './Challenges'
import {useTranslation} from "react-i18next";
import Submissions from "./Submissions";
import AuditTeam from "./AuditTeam";
import UpdateContest from "./UpdateContest";

export default () => {

    const {contestId} = useParams()

    return (
        <>
            <ContestAdminNavBar contestId={contestId}/>
            <Routes>
                <Route path={`/`} element={<MainPage/>}/>
                <Route path={`/Challenges/*`} element={<Challenges/>}/>
                <Route path={`/Teams`} element={<Teams/>}/>
                <Route path={`/Submissions`} element={<Submission/>}/>
                <Route path={`/ScoreBoard`} element={<ScoreBoard/>}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}

function MainPage() {
    const {t} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Breadcrumb.Item active>{t('description.Contest')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contest_Detail')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <UpdateContest contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}

function Teams() {
    const {t} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.Teams')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Teams')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <AuditTeam contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}

function Submission() {
    const {t} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.Submissions')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>{t('description.Submissions')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Submissions contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}

function ScoreBoard() {
    const {t} = useTranslation();
    const {contestId} = useParams()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.ScoreBoard')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>{t('description.ScoreBoard')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>

                </Col>
            </Row>
        </>
    )
}