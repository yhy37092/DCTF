import {useTranslation} from "react-i18next";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RemoveContest from "../../components/ContestAdmin/RemoveContest";
import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'


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
                            <FontAwesomeIcon icon={solid("circle-plus")}/>
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