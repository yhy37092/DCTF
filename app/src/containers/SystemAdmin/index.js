import React from 'react'
import {Route, Routes} from 'react-router-dom'

import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {GrantMember, NoMatch, RevokeMember} from "../../components";

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
                    <GrantMember/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RevokeMember/>
                </Col>
            </Row>
        </>
    )
}