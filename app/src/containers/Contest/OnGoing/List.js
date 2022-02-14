import React, {useEffect, useState} from "react";
import Challenge from "./Challenge";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    const {gets} = drizzle.contracts.Challenges.methods;
    const {getOne} = drizzle.contracts.Teams.methods;

    const [challengesKey, setChallengesKey] = useState(0);
    const {Challenges} = drizzleState.contracts;
    const challenges = Challenges.gets[challengesKey]
    useEffect(() => {
        const challengesKey = gets.cacheCall(contestId);
        setChallengesKey(challengesKey);
    }, [gets, contestId])

    const [teamKey, setTeamKey] = useState(0);
    const team = drizzleState.contracts.Teams.getOne[teamKey]
    useEffect(() => {
        const teamKey = getOne.cacheCall(contestId, drizzleState.accounts[0]);
        setTeamKey(teamKey);
    }, [getOne, contestId, drizzleState.accounts])

    return (
        <>
            {challenges ? (
                challenges.value.map(((challenge, index) => (
                    <Challenge key={index} challenge={challenge} drizzle={drizzle} drizzleState={drizzleState}
                                      teamId={team && team.value.id}/>
                )))
            ) : null}
        </>
    );
};