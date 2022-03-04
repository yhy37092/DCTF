import React from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ListGameBox from "../../../../components/GameBox/ListGameBox";

export default () => {
    const {t} = useTranslation();
    const {contestId} = useParams()
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to='/Review' className='breadcrumb-item'>{t('description.Review')}</Link>
                        <Link to={`/Review/Contest-${contestId}`}
                              className='breadcrumb-item'>{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.GameBoxes')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGameBox contestId={contestId}/>
                </Col>
            </Row>
        </>
    )
}