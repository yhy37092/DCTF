import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import TeamCard from "../Team/TeamDetail";
import ApplyContestForm from "../Forms/ApplyContestForm";
import TransactionStatuses from "../TransactionStatuses";

export default ({contest, team}) => {

    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Teams', 'applyContest')

    function handleApply({_data}) {
        send(contest.id, _data, {value: contest.info.fee})
    }

    return (
        <>
            <Row>
                <Col>
                    <TransactionStatuses TXObjects={TXObjects}/>
                    {team.state === '0' ? (
                        <div align="center">
                            <h3>Apply contest</h3>
                            <ApplyContestForm onSubmit={handleApply}/>
                        </div>
                    ) : null}
                    {team.state === '1' ? (
                        <div align="center">
                            <h3>Already applied,waiting for approving...</h3>
                            <h3>team info</h3>
                            <TeamCard data={team}/>
                        </div>
                    ) : null}
                    {team.state === '2' ? (
                        <div align="center">
                            <h3>your apply is approved</h3>
                            <h2><Link to={`/Contests/Contest-${contest.id}/ongoing`}>Go to
                                contest</Link></h2>
                            <h3>team info</h3>
                            <TeamCard data={team}/>
                        </div>
                    ) : null}
                    {team.state === '3' ? (<div align="center">
                        <h3>Sorry,your apply is rejected!!!</h3>
                        <h2>But you can re-apply</h2>
                        <h3>team info</h3>
                        <TeamCard data={team}/>
                        <ApplyContestForm onSubmit={handleApply}/>
                    </div>) : null}
                </Col>
            </Row>
        </>

    );
};