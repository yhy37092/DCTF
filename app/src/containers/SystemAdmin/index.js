import React from 'react'
import {Route, Routes} from 'react-router-dom'

import NoMatch from '../../components/NoMatch'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import Grant from './Grant'
import Revoke from './Revoke'

export default props => {
    const {drizzle, drizzleState} = props
    return (
        <Routes>
            <Route path='/' element={<MainPage drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}

function MainPage(props) {
    const {drizzle, drizzleState} = props
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>SystemAdmin</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Grant drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Revoke drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>
    )
}