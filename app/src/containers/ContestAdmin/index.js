import React from 'react'
import {Breadcrumb, Button, Col, Row} from 'react-bootstrap'
import {Link, Route, Routes} from 'react-router-dom'
import {NoMatch} from "../../components";
import {useTranslation} from "react-i18next";
import Contest from './Contest'
import RemoveContest from "./RemoveContest";
import NewContest from "./NewContest";

export default () => {

    return (
        <Routes>
            <Route path={`/`} element={<MainPage/>}/>
            <Route path={`/New`}
                   element={<New/>}/>
            <Route path={`/Contest-:contestId/*`}
                   element={<Contest/>}/>
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
                        <Breadcrumb.Item active>{t('description.ContestAdmin')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contests')}
                        <Link to={'/ContestAdmin/New'}><Button variant='outline-secondary'>
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
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Breadcrumb.Item active>{t('description.New')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Create_Contest')}</h1>
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