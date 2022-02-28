import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import Contest from "../../components/Contest/Contest";
import React from "react";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">{t('description.Contests')}</Link>
                        <Breadcrumb.Item active>{t('description.Contest')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align="center">{t('description.Contest')}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Contest contestId={contestId}/>
                </Col>
            </Row>
        </>
    )
}