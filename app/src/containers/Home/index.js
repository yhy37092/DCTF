import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default () => {
    const {t} = useTranslation();
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>{t('description.Home')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div align="center">
                        <h5>This is a decentralized ctf platform base on Ethereum.</h5>
                        <p><a href="https://en.wikipedia.org/wiki/Decentralized_application">see what is
                            decentralized application here</a></p>
                        <p>DCTF suport jeopardy and AWD mode.</p>
                        <p>System administrator can grant or revoke contest administrator account in
                            <Link to={'SystemAdmin'}>SystemAdmin</Link>
                        </p>
                        <p>Contest admin can publish contest and manage contest in
                            <Link to={'ContestAdmin'}>ContestAdmin</Link>
                        </p>
                        <p>As a user, you can attend contest in
                            <Link to={'Contests'}>Contests</Link>
                            and review ended one in
                            <Link to={'Review'}>Review</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </>
    );

}
