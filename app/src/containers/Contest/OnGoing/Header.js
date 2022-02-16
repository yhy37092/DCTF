import React from "react";
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getUserFlags} from "../../../reducers/flags";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {
    const flags = useSelector(getUserFlags);

    const {contestId} = useParams();

    const {revealForMember} = drizzle.contracts.Moves.methods;

    const handleReveal = () => {
        flags.forEach((flag) => {
            if (contestId === flag.contestId) {
                revealForMember.cacheSend(contestId, flag.teamId, flag.challengeId, flag.flag, flag.salt);
            }
        })
    }
    return (
        <h1 align="center">Challenges
            <Button variant="outline-secondary" onClick={handleReveal}>
                <i className="fas fa-arrow-circle-up"/>
            </Button>
        </h1>
    )
}