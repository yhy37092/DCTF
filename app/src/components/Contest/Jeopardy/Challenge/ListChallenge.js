import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {challenge} from "../../../../MetaData.json";
import ChallengePreviews from "./ChallengePreviews";

export default ({contestId, teamId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <ChallengePreviews
            teamId={teamId}
            contestId={contestId}
            challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
        />
    );
};