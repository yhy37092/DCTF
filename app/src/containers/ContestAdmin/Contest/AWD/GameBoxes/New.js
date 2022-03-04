import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import React from "react";
import NewGameBox from "../../../../../components/ContestAdmin/AWD/GameBox/NewGameBox";

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
                        <Link to={`/ContestAdmin/Contest-${contestId}/GameBox`}
                              className='breadcrumb-item'>{t('description.GameBoxes')}</Link>
                        <Breadcrumb.Item active>{t('description.New')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Create_GameBox')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewGameBox contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}