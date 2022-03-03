import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import {gameBox} from '../../../../MetaData.json'
import UpdateENVForm from "../../../Forms/AWD/UpdateGameBoxForm";

export default ({contestId, GameBoxId}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Challenges', 'update')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <UpdateENVForm
                data={useCacheCall('GameBoxes', 'getGameBox', GameBoxId) || gameBox}
                onSubmit={useCallback(({_data}) => send(contestId, GameBoxId, _data), [send, contestId, GameBoxId])}/>
        </>
    )
}