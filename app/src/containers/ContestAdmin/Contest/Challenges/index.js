import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {CommitChallenge, NewChallenge, RemoveChallenge, RevealChallenge, UpdateChallenge} from "../../../../components";

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
    
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Breadcrumb.Item active>Challenges</Breadcrumb.Item>
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
    
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`}
                              className='breadcrumb-item'>Challenges</Link>
                        <Breadcrumb.Item active>New</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Create Challenge</h1>
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
    
    const {contestId, challengeId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`}
                              className='breadcrumb-item'>Challenges</Link>
                        <Breadcrumb.Item active>Challenge-{challengeId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Update Challenge</h1>
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