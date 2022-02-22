import React from "react";
import {ContestPreview} from "../../components"
import {contest} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";


export default ({filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <>
            {useCacheCall(['Contests'], call => [...Array(parseInt((call('Contests', 'getCount') || '0'))).keys()].map(value => call('Contests', 'get', value) || contest))
                .map(
                (value, index) => (
                    (filter({_data: value}) ? (
                        <div key={index}>
                            <ContestPreview data={value} link={`/Contests/Contest-${value.id}`}/>
                            <br/>
                        </div>
                    ) : null)
                )
            )}
        </>
    );
};