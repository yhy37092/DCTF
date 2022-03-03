import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {ContestDetail} from "../../../components";
import {contest as defaultContest} from "../../../MetaData.json";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams()
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Review' className='breadcrumb-item'>{t('description.Review')}</Link>
                        <Breadcrumb.Item active>{t('description.Jeopardy')}-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contest_Detail')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ContestDetail contest={useCacheCall('Contests', 'getContest', contestId) || defaultContest}/>
                </Col>
            </Row>
        </>

    )
}