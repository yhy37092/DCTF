import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ListTeam from "../../../components/Team/ListTeam";
import React from "react";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Review' className='breadcrumb-item'>{t('description.Review')}</Link>
                        <Link to={`/Review/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Jeopardy')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.Teams')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Teams')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListTeam contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}