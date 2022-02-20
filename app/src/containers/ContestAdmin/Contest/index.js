import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import NoMatch from '../../../components/NoMatch'
import {ContestAdmin} from '../../../components/Navbars'
import Challenges from './Challenges'
import UpdateContest from './UpdateContest'
import AuditTeam from './AuditTeam'
import Submissions from "./Submissions";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams()

    return (
        <>
            <ContestAdmin contestId={contestId}/>
            <Routes>
                <Route path={`/`} element={<MainPage drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Challenges/*`} element={<Challenges drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Teams`} element={<Teams drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Submissions`} element={<Submission drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </>
    )
}

function MainPage(props) {
    const {drizzle, drizzleState} = props
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
                    <UpdateContest drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}

function Teams(props) {
    const {drizzle, drizzleState} = props
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
                    <AuditTeam drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}

function Submission(props) {
    const {drizzle, drizzleState} = props
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
                    <Submissions drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}