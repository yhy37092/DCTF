import React, {useCallback} from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import TransactionStatuses from '../../../TransactionStatuses'
import {challenge as defaultChallenge, gameBox as defaultGameBox, team as defaultTeam} from '../../../../MetaData.json'
import RemoveForm from "../../../RemoveForm";
import {Link} from "react-router-dom";
import ChallengeNamePreview from "../../../Challenge/ChallengeNamePreview";
import TeamNamePreview from "../../../Team/TeamNamePreview";

export default ({contestId,filter}) => {
    const {useCacheSend, useCacheCall} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('GameBoxes', 'removes')

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <RemoveForm
                filter={filter}
                data={useCacheCall(['GameBoxes', 'Challenges', 'Teams'], call => (call('GameBoxes', 'getContestGameBoxIds', contestId) || []).map(value => {
                    const gameBox = call('GameBoxes', 'getGameBox', parseInt(value)) || defaultGameBox
                    const team = call('Teams', 'getTeam', parseInt(gameBox.teamId)) || defaultTeam
                    const challenge = call('Challenges', 'getChallenge', parseInt(gameBox.challengeId)) || defaultChallenge
                    return ({
                        Id: gameBox.id,
                        ChallengeName: <ChallengeNamePreview challenge={challenge}/>,
                        TeamName: <TeamNamePreview team={team}/>,
                        Address: <Link to={`GameBox-${gameBox.id}`}>{gameBox.info.ip}:{gameBox.info.port}</Link>,
                    })
                }))}
                onSubmit={useCallback(({selectedData}) => {
                    const ids = [];
                    console.log(selectedData)
                    selectedData.forEach(value => ids.push(value.Id))
                    send(contestId, ids)
                }, [send, contestId])}/>
        </>
    )
}