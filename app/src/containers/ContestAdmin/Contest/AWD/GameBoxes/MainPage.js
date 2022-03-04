import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import React from "react";
import RemoveGameBox from "../../../../../components/ContestAdmin/AWD/GameBox/RemoveGameBox";

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
                        <Breadcrumb.Item active>{t('description.GameBoxes')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.GameBox')}
                        <Link to={`New`}>
                            <Button
                                variant='outline-secondary'><i
                                className='btn-fa fas fa-plus-circle'/></Button></Link>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveGameBox contestId={contestId}/>
                </Col>
            </Row>
        </>

    )
}