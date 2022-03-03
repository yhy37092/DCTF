import React from "react";
import {challenge} from "../../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import ChallengePreviews from "./ChallengePreviews";

export default ({contestId,filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <ChallengePreviews
            filter={filter}
            challenges={useCacheCall(['Challenges'], call => (call('Challenges', 'getContestChallengeIds', contestId) || []).map(value => call('Challenges', 'getChallenge', parseInt(value)) || challenge))}
        />
    );
};