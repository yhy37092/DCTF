import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import RevealChallenge from "../../../../components/ContestAdmin/Challenge/RevealChallenge";
import RemoveChallenge from "../../../../components/ContestAdmin/Challenge/RemoveChallenge";
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
                        <Breadcrumb.Item active>{t('description.Challenges')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Challenges')}
                        <Link to={`New`}>
                            <Button
                                variant='outline-secondary'><i
                                className='btn-fa fas fa-plus-circle'/></Button></Link>
                        <RevealChallenge contestId={contestId}/>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveChallenge contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}