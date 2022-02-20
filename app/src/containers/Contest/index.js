import React, {useCallback} from 'react'
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {before} from '../../utils/utils'
import {contest, team} from '../../MetaData.json'
import {
    ApplyContest, Contest,
    ContestNavBar,
    ListContest,
    ListMyContest,
    NoMatch,
    OnGoingContest
} from "../../components";

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

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Contests</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Contests</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListContest filter={useCallback(({_data}) => (before(_data.info.start)), [])}/>
                </Col>
            </Row>
        </>
    )
}

function My() {

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Contests' className='breadcrumb-item'>Contests</Link>
                        <Breadcrumb.Item active>My</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>My Contests</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListMyContest/>
                </Col>
            </Row>
        </>
    )
}

function Detail() {
    const {contestId} = useParams();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Breadcrumb.Item active>Contest-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align="center">Contest</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Contest contestId={contestId}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ApplyContest
                        contest={useCacheCall("Contests", 'contests', contestId) || contest}
                        team={useCacheCall("Teams", 'getOne', contestId, drizzleState.account) || team}
                    />
                </Col>
            </Row>
        </>
    )
}

function OnGoing() {
    const {contestId} = useParams();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">Contests</Link>
                        <Link to={`/Contests/Contest-${contestId}`}
                              className="breadcrumb-item">Contest-{contestId}</Link>
                        <Breadcrumb.Item active>OnGoing</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <OnGoingContest
                        contest={useCacheCall("Contests", 'contests', contestId) || contest}
                        team={useCacheCall("Teams", 'getOne', contestId, drizzleState.account) || team}
                    />
                </Col>
            </Row>

        </>
    )
}