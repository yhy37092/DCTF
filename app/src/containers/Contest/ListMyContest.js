import React, {useCallback} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import ListContest from "./ListContest";


export default () => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    return (
        <>
            {
                useCacheCall(['Teams', 'Contests'], call => {
                    const ids = call('Teams', 'getApply') || []
                    return <ListContest filter={useCallback(({_data}) => (ids.includes(_data.id)), [ids])}/>
                })
            }
        </>
    );
};