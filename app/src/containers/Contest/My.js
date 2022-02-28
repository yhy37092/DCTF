import {useTranslation} from "react-i18next";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ListMyContest from "../../components/Contest/ListMyContest";
import React from "react";

export default () => {
    const {t} = useTranslation();
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Contests' className='breadcrumb-item'>{t('description.Contests')}</Link>
                        <Breadcrumb.Item active>{t('description.My')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.My')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListMyContest data={useCacheCall('Teams', 'getMyContestIds') || []}/>
                </Col>
            </Row>
        </>
    )
}