import {useTranslation} from "react-i18next";
import {after, before, toDate} from "../../../utils/utils";
import {Col, Row} from "react-bootstrap";
import Countdown from "react-countdown";
import RevealChallenge from "../../../components/Contest/Jeopardy/Challenge/RevealChallenge";
import ListChallenge from "../../../components/Contest/Jeopardy/Challenge/ListChallenge";
import ListChallengeNoCommit from "../../../components/Challenge/Jeopardy/ListChallenge"
import React from "react";
import {Link} from "react-router-dom";

export default ({contest, teamId}) => {
    const {t} = useTranslation();
    return (
        <>
            {
                before(parseInt(contest.info.start)) &&
                <div>
                    <Row>
                        <Col>
                            <h3 align="center">
                                {t('description.toContestStart')}
                            </h3>
                            <h3 align="center">
                                <Countdown date={new Date(parseInt(contest.info.start) * 1000)}/>
                            </h3>
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
                after(parseInt(contest.info.start)) && before(parseInt(contest.info.start) + parseInt(contest.info.flagCommitTime)) &&
                <div>
                    <Row>
                        <Col>
                            <h3 align="center">
                                {t('description.toContestCommit')}
                            </h3>
                            <h3 align="center">
                                <Countdown
                                    date={new Date((parseInt(contest.info.start) + parseInt(contest.info.flagCommitTime)) * 1000)}/>
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 align="center">{t('description.Challenges')}</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ListChallengeNoCommit contestId={contest.id}
                                                   teamId={teamId}/>
                        </Col>
                    </Row>
                </div>
            }
            {
                after(parseInt(contest.info.start) + parseInt(contest.info.flagCommitTime)) && before(parseInt(contest.info.end)) &&
                <div>
                    <Row>
                        <Col>
                            <h3 align="center">
                                {t('description.toContestEnd')}
                            </h3>
                            <h3 align="center">
                                <Countdown date={new Date(parseInt(contest.info.end) * 1000)}/>
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 align="center">{t('description.Challenges')}</h1>
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
            {
                after(parseInt(contest.info.end)) && before(parseInt(contest.info.end) + parseInt(contest.info.revealTime)) &&
                <div>
                    <Row>
                        <Col>
                            <h3 align="center">
                                {t('description.toContestRevealEnd')}
                            </h3>
                            <h3 align="center">
                                <Countdown
                                    date={new Date((parseInt(contest.info.end) + parseInt(contest.info.revealTime)) * 1000)}/>
                            </h3>
                        </Col>
                    </Row>
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
                            <ListChallengeNoCommit contestId={contest.id}
                                                   teamId={teamId}/>
                        </Col>
                    </Row>
                </div>
            }
            {
                after(parseInt(contest.info.end) + parseInt(contest.info.revealTime)) &&
                <div align="center">
                    <h3>{t('description.contest_end')}</h3>
                    <h2><Link
                        to={`/Review/Contest-${contest.id}`}>{t('description.reviewContest')}</Link>
                    </h2>
                </div>
            }
        </>
    )
}