import React from "react";
import {contest as defaultContest} from "../../MetaData.json";
import {ContestDetail} from "../../components";
import {drizzleReactHooks} from "@drizzle/react-plugin";

export default ({contestId}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return <ContestDetail data={useCacheCall('Contests', 'getContest', contestId) || defaultContest}/>
}