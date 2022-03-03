import React from "react";
import {challenge as defaultChallenge, gameBox as defaultGameBox, team as defaultTeam} from "../../MetaData.json";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import Table from "./Table";

export default ({contestId, filter}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    return (
        <Table
            filter={filter}
            data={useCacheCall(['GameBoxes', 'Challenges', 'Teams'], call => (call('GameBoxes', 'getContestGameBoxIds', contestId) || []).map(value => {
                const gameBox = call('GameBoxes', 'getGameBox', parseInt(value)) || defaultGameBox
                const team = call('Teams', 'getTeam', parseInt(gameBox.teamId)) || defaultTeam
                const challenge = call('Challenges', 'getChallenge', parseInt(gameBox.challengeId)) || defaultChallenge
                return ({
                    Id: gameBox.id,
                    ChallengeId: challenge.id,
                    TeamId: team.id,
                    TeamName: team.info.name,
                    Address: <a
                        href={`${gameBox.info.ip}:${gameBox.info.port}`}>{gameBox.info.ip}:{gameBox.info.port}</a>,
                })
            }))}/>
    );
};