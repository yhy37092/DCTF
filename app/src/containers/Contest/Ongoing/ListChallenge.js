import React from "react";
import Challenge from "./CommitChallenge";
import {challenge} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default ({contestId, teamId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            <Show
                teamId={teamId}
                contestId={contestId}
                challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
            />
        </>
    );
};

function Show({contestId, teamId, challenges}) {
    return (
        <>
            {challenges.map(
                (value, index) => (
                    <div key={index}>
                        <Challenge contestId={contestId} teamId={teamId} challenge={value}/>
                        <br/>
                    </div>
                ))}
        </>
    )
}