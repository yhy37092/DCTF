import {useTranslation} from "react-i18next";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ListContest from "../../components/Contest/ListContest";
import React, {useCallback} from "react";
import {after} from "../../utils/utils";

export default () => {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.Contests')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contests')}</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ListContest
                        filter={useCallback(({_data}) => after(_data.info.end), [])}/>
                </Col>
            </Row>
        </>
    )
}