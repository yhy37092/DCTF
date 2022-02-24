import React, {useCallback} from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {before} from '../../utils/utils'
import {ContestNavBar, NoMatch,} from "../../components";
import ListContest from "./ListContest";
import ApplyContest from "./ApplyContest";
import OnGoingContest from "./Ongoing/OnGoingContest";
import {useTranslation} from "react-i18next";
import ListMyContest from "./ListMyContest";
import Contest from "./Contest";

export default () => {
    return (
        <>
            <ContestNavBar/>
            <Routes>
                <Route path={`/`} element={<MainPage/>}/>
                <Route path={`/My`} element={<My/>}/>
                <Route path={`/Contest-:contestId`} element={<Detail/>}/>
                <Route path={`/Contest-:contestId/ongoing`} element={<OnGoing/>}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}

function MainPage() {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.Contests')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contests')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListContest
                        filter={useCallback(({_data}) => before(_data.info.start), [])}/>
                </Col>
            </Row>
        </>
    )
}

function My() {
    const {t} = useTranslation();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Contests' className='breadcrumb-item'>{t('description.Contests')}</Link>
                        <Breadcrumb.Item active>{t('description.My')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.My')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListMyContest data={useCacheCall('Teams', 'getMyContestIds') || []}/>
                </Col>
            </Row>
        </>
    )
}

function Detail() {
    const {t} = useTranslation();
    const {contestId} = useParams();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">{t('description.Contests')}</Link>
                        <Breadcrumb.Item active>{t('description.Contest')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align="center">{t('description.Contest')}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Contest contestId={contestId}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ApplyContest contestId={contestId}/>
                </Col>
            </Row>
        </>
    )
}

function OnGoing() {
    const {t} = useTranslation();
    const {contestId} = useParams();
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
                    <OnGoingContest contestId={contestId}/>
                </Col>
            </Row>

        </>
    )
}