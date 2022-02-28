import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import OnGoingContest from "../../components/Contest/Ongoing/OnGoingContest";
import React from "react";

export default() =>{
    const {t} = useTranslation();
    const {contestId} = useParams();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/Contests" className="breadcrumb-item">{t('description.Contests')}</Link>
                        <Link to={`/Contests/Contest-${contestId}`}
                              className="breadcrumb-item">{t('description.Contest')}-{contestId}</Link>
                        <Breadcrumb.Item active>{t('description.OnGoing')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <OnGoingContest contestId={contestId}/>
                </Col>
            </Row>

        </>
    )
}