import React from 'react'
import {Route, Routes} from 'react-router-dom'

import {Breadcrumb, Col, Row} from 'react-bootstrap'
import {NoMatch} from "../../components";
import {useTranslation} from "react-i18next";
import GrantMember from "./GrantMember";
import RevokeMember from "./RevokeMember";
import Web3Utils from "web3-utils";

export default () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}

function MainPage() {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.SystemAdmin')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <GrantMember Role={Web3Utils.keccak256('CONTEST_ADMIN')}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RevokeMember Role={Web3Utils.keccak256('CONTEST_ADMIN')}/>
                </Col>
            </Row>
        </>
    )
}