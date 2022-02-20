import React from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {ContestPreview} from "./index"


export default ({filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            {
                (useCacheCall('Contests', 'getAll') || []).map((value, index) => (
                    (filter({_data: value}) ? (
                        <div key={index}>
                            <ContestPreview contest={value} link={`/Contests/Contest-${value.id}`}/>
                            <br/>
                        </div>
                    ) : null)
                ))
            }
        </>
    );
};