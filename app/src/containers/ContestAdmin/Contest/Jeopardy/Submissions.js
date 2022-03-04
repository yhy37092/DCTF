import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import Submissions from "../../../../components/ContestAdmin/Jeopardy/ListSubmission";
import React from "react";

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
                        <Breadcrumb.Item active>{t('description.Submissions')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>{t('description.Submissions')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Submissions contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}