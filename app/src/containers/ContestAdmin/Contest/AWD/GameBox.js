import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams()
    return(
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.GameBox')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <p>to add...</p>
        </>
    )
}