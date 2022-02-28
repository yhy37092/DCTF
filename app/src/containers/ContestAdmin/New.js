import {useTranslation} from "react-i18next";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import NewContest from "../../components/ContestAdmin/Contest/NewContest";
import React from "react";

export default () => {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/ContestAdmin' className='breadcrumb-item'>{t('description.ContestAdmin')}</Link>
                        <Breadcrumb.Item active>{t('description.New')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Create_Contest')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContest/>
                </Col>
            </Row>
        </>
    )
}