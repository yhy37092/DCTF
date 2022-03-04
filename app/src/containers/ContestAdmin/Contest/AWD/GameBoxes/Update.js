import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import React from "react";
import UpdateGameBox from "../../../../../components/ContestAdmin/AWD/GameBox/UpdateGameBox";

export default () => {
    const {t} = useTranslation();
    const {contestId, GameBoxId} = useParams()

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Link to={`/ContestAdmin/Contest-${contestId}/GameBoxes`}
                              className='breadcrumb-item'>{t('description.GameBoxes')}</Link>
                        <Breadcrumb.Item active>{t('description.GameBox')}-{GameBoxId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.GameBox_Detail')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <UpdateGameBox contestId={contestId} GameBoxId={GameBoxId}/>
                </Col>
            </Row>
        </>

    )
}