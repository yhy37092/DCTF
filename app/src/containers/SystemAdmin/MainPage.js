import {useTranslation} from "react-i18next";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import GrantMember from "../../components/SystemAdmin/GrantMember";
import Web3Utils from "web3-utils";
import RevokeMember from "../../components/SystemAdmin/RevokeMember";
import React from "react";

export default () => {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.SystemAdmin')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align='center'>{t('description.Contest_admins')}
                        <GrantMember Role={Web3Utils.keccak256('CONTEST_ADMIN')}/>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RevokeMember Role={Web3Utils.keccak256('CONTEST_ADMIN')}/>
                </Col>
            </Row>
        </>
    )
}