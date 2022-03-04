import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {challenge} from "../../../MetaData.json";
import ChallengePreviews from "./ChallengePreviews";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <ChallengePreviews
            contestId={contestId}
            challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
        />
    );
};