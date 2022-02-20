import React from 'react'
import {Breadcrumb, Button, Col, Row} from 'react-bootstrap'
import {Link, Route, Routes} from 'react-router-dom'
import Contest from './Contest'
import {NewContest, NoMatch, RemoveContest} from "../../components";

export default () => {

    return (
        <Routes>
            <Route path={`/`} element={<MainPage/>}/>
            <Route path={`/ContestNew`}
                   element={<New/>}/>
            <Route path={`/Contest-:contestId/*`}
                   element={<Contest/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}

function MainPage() {
    
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>ContestAdmin</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Contests
                        <Link to={'/ContestAdmin/ContestNew'}><Button variant='outline-secondary'>
                            <i className='btn-fa fas fa-plus-circle'/>
                        </Button></Link>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveContest />
                </Col>
            </Row>
        </>
    )
}

function New() {
    
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>ContestAdmin</Link>
                        <Breadcrumb.Item active>ContestNew</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>Create Contest</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContest />
                </Col>
            </Row>
        </>
    )
}