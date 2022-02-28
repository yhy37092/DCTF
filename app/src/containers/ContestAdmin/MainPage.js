import {useTranslation} from "react-i18next";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RemoveContest from "../../components/ContestAdmin/Contest/RemoveContest";
import React from "react";

export default () => {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.ContestAdmin')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contests')}
                        <Link to={'New'}><Button variant='outline-secondary'>
                            <i className='btn-fa fas fa-plus-circle'/>
                        </Button></Link>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RemoveContest/>
                </Col>
            </Row>
        </>
    )
}