import React from "react";
import Challenge from "./CommitChallenge";
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default ({contest, team}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            {
                (useCacheCall('Challenges', 'gets', contest.id) || []).map(
                    ((value, index) => (
                        <div key={index}>
                            <Challenge contest={contest} team={team} challenge={value}/>
                            <br/>
                        </div>
                    )))
            }
        </>
    );
};