import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import RemoveChallenge from "../../../../../components/ContestAdmin/AWD/Challenge/RemoveChallenge";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

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
                            <Button variant='outline-secondary'>
                                <FontAwesomeIcon icon={solid("circle-plus")}/>
                            </Button>
                        </Link>
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