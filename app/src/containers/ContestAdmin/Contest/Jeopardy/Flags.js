import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import React from "react";
import ListFlag from "../../../../components/ContestAdmin/Jeopardy/ListFlag";

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
                        <Breadcrumb.Item active>{t('description.Flags')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>{t('description.Flags')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListFlag contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}