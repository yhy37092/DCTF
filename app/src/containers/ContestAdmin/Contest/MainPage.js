import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import UpdateContest from "../../../components/ContestAdmin/Contest/UpdateContest";
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
                        <Breadcrumb.Item active>{t('description.Contest')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contest_Detail')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <UpdateContest contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}