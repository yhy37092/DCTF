import React from "react";
import {challenge} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import ShowChallenge from "./ShowChallenge";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Show
                challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
            />
        </>
    );
};

function Show({challenges}) {
    return (
        <>
            {challenges.map(
                (value, index) => (
                    <div key={index}>
                        <ShowChallenge challenge={value}/>
                        <br/>
                    </div>
                ))}
        </>
    )
}