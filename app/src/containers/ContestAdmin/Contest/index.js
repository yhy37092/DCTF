import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {AuditTeam, ContestAdminNavBar, NoMatch, Submissions, UpdateContest} from '../../../components'
import Challenges from './Challenges'

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
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}

function MainPage() {
    
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Breadcrumb.Item active>Contest-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Contest Detail</h1>
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
    
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Breadcrumb.Item active>Teams</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>teams</h1>
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
    
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Breadcrumb.Item active>Submissions</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>Submissions</h1>
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