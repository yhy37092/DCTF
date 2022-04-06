import React from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import NewChallenge from "../../../../../components/ContestAdmin/Jeopardy/Challenge/NewChallenge";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/Challenges`}
                              className='breadcrumb-item'>{t('description.Challenges')}</Link>
                        <Breadcrumb.Item active>{t('description.New')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Create_Challenge')}</h1>
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