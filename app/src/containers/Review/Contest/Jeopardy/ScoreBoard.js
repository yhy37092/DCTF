import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import UpdateScore from "../../../../components/ContestAdmin/Jeopardy/UpdateScore";
import Scores from "../../../../components/ContestAdmin/Jeopardy/ListScore";
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
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.ScoreBoard')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1 align='center'>{t('description.ScoreBoard')}
                        <UpdateScore contestId={contestId}/>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Scores contestId={contestId}/>
                </Col>
            </Row>
        </>
    )
}