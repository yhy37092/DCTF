import React from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import NewChallenge from './NewChallenge'
import RemoveChallenge from './RemoveChallenge'
import RevealChallenge from './RevealChallenge'
import CommitChallenge from './CommitChallenge'
import UpdateChallenge from './UpdateChallenge'

export default props => {
    const {drizzle, drizzleState} = props
    return (
        <Routes>
            <Route path={`/`} element={<MainPage drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Challenge-:challengeId`} element={<Update drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/New`} element={<New drizzle={drizzle} drizzleState={drizzleState}/>}/>
        </Routes>
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
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>Contest-{contestId}</Link>
                        <Breadcrumb.Item active>Challenges</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RevealChallenge drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveChallenge drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}

function New(props) {
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
                    <NewChallenge drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}

function Update(props) {
    const {drizzle, drizzleState} = props
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
                    <CommitChallenge drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
                <Col>
                    <UpdateChallenge drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    )
}