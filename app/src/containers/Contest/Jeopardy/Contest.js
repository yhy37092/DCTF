import {useTranslation} from "react-i18next";
import {after, before, toDate} from "../../../utils/utils";
import {Col, Row} from "react-bootstrap";
import Countdown from "react-countdown";
import RevealChallenge from "../../../components/Contest/Challenge/RevealChallenge";
import ListChallenge from "../../../components/Contest/Challenge/ListChallenge";
import React from "react";

export default ({contest, teamId}) => {
    const {t} = useTranslation();
    return (
        <>
            {
                before(contest.info.start) &&
                <div>
                    <Row>
                        <Col>
                            <h1 align="center">
                                <Countdown date={new Date(parseInt(contest.info.start) * 1000)}/>
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div align="center">
                                <h1>{t('description.ContestWillBegin')}</h1>
                                <h1><strong>{toDate(contest.info.start)}</strong></h1>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
            {
                after(contest.info.start) &&
                <div>
                    <Row>
                        <Col>
                            <h1 align="center">{t('description.Challenges')}
                                <RevealChallenge contestId={contest.id}
                                                 teamId={teamId}/>
                            </h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ListChallenge contestId={contest.id}
                                           teamId={teamId}/>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}