import React from 'react'
import {Route, Routes} from 'react-router-dom'

import NoMatch from '../../components/NoMatch'
import {Breadcrumb, Col, Row} from 'react-bootstrap'
import Grant from './Grant'
import Revoke from './Revoke'

export default () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
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
                        <Breadcrumb.Item active>SystemAdmin</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Grant/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Revoke/>
                </Col>
            </Row>
        </>
    )
}