import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getAdminFlags} from "../../../../../reducers/flags";

export default ({drizzle, drizzleState}) => {
    const {contestId} = useParams();

    const flags = useSelector(getAdminFlags);

    const {revealForAdmin} = drizzle.contracts.Moves.methods;

    const handleReveal = () => {
        flags.forEach((flag) => {
            if (contestId === flag.contestId) {
                revealForAdmin.cacheSend(flag.contestId, flag.challengeId, flag.flag, flag.salt);
            }
        })
    }
    return (
        <h1 align="center">Challenges
            <Link to={`/ContestAdmin/Contest-${contestId}/Challenges/New`}>
                <Button
                variant="outline-secondary"><i
                className="btn-fa fas fa-plus-circle"/></Button></Link>
            <Button variant="outline-secondary" onClick={handleReveal}>
                <i className="fas fa-arrow-circle-up"/>
            </Button>
        </h1>
    )
}