import {useTranslation} from "react-i18next";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useCallback} from "react";
import ListContest from "../../components/Contest/ListContest";

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
                    <ListMyContest contestIds={useCacheCall('Teams', 'getMyContestIds') || []}/>
                </Col>
            </Row>
        </>
    )
}

function ListMyContest({contestIds}) {
    return <ListContest filter={useCallback(({_data}) => contestIds.includes(_data.id), [contestIds])}/>
}