import React from "react";
import {contest} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import ContestPreviews from "./ContestPreviews";


export default ({filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <ContestPreviews
            filter={filter}
            data={useCacheCall(['Contests'], call => [...Array(parseInt((call('Contests', 'getCount') || '0'))).keys()].map(value => call('Contests', 'get', value) || contest))}
        />
    );
};
