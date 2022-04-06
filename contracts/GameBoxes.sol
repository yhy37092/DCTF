// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IContests.sol";
import "./interfaces/IGameBoxes.sol";
import "./interfaces/ITeams.sol";
import "./interfaces/IChallenges.sol";

contract GameBoxes is IGameBoxes {

    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;
    IChallenges Challenges;
    ITeams Teams;

    constructor(address _Contests, address _Challenges, address _Teams) {
        Contests = IContests(_Contests);
        Teams = ITeams(_Teams);
        Challenges = IChallenges(_Challenges);
    }

    EnumerableSet.UintSet ids;
    mapping(uint => GameBox) gameBoxes;
    uint public nextId = 1;

    // challengeId + teamId => GameBoxId
    mapping(uint => mapping(uint => uint)) teamGameBox;
    mapping(uint => EnumerableSet.UintSet) contestGameBoxes;

    function _remove(uint contestId, uint gameBoxId) internal
    onlyContestGameBox(contestId, gameBoxId)
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE) {
        ids.remove(gameBoxId);
        contestGameBoxes[contestId].remove(gameBoxId);
        delete teamGameBox[gameBoxes[gameBoxId].challengeId][gameBoxes[gameBoxId].teamId];
        delete gameBoxes[gameBoxId];
    }

    function add(uint contestId, uint challengeId, uint teamId, IGameBox calldata gameBox) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE)
    onlyChallengeExist(challengeId)
    onlyTeamExist(teamId) {
        require(gameBoxes[teamGameBox[challengeId][teamId]].id == 0, "only game box not exist");
        ids.add(nextId);
        contestGameBoxes[contestId].add(nextId);
        teamGameBox[challengeId][teamId] = nextId;
        gameBoxes[nextId] = GameBox(nextId, contestId, challengeId, teamId, gameBox, block.timestamp);
        nextId++;
    }

    function update(uint contestId, uint gameBoxId, IGameBox calldata gameBox) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE)
    onlyGameBoxExist(gameBoxId)
    onlyContestGameBox(contestId, gameBoxId) {
        gameBoxes[gameBoxId].info = gameBox;
    }

    function remove(uint contestId, uint gameBoxId) external {
        _remove(contestId, gameBoxId);
    }

    function removes(uint contestId, uint [] memory gameBoxIds) external {
        for (uint i = 0; i < gameBoxIds.length; i++) {
            _remove(contestId, gameBoxIds[i]);
        }
    }

    function isContestGameBox(uint contestId, uint gameBoxId) view external returns (bool) {
        return contestGameBoxes[contestId].contains(gameBoxId);
    }

    function getContestGameBoxIds(uint contestId) external view returns (uint [] memory) {
        return contestGameBoxes[contestId].values();
    }

    function getChallengeTeamGameBoxId(uint challengeId, uint teamId) external view returns (uint){
        return teamGameBox[challengeId][teamId];
    }

    function getGameBox(uint gameBoxId) external view returns (GameBox memory){
        return gameBoxes[gameBoxId];
    }

    function getCount() external view returns (uint){
        return ids.length();
    }

    function get(uint index) external view returns (GameBox memory){
        return gameBoxes[ids.at(index)];
    }

    modifier onlyGameBoxExist(uint gameBoxId){
        require(gameBoxes[gameBoxId].id > 0, "only game box exist");
        _;
    }

    modifier onlyChallengeExist(uint challengeId){
        IChallenges.Challenge memory challenge = Challenges.getChallenge(challengeId);
        require(challenge.id > 0, "only challenge exist");
        _;
    }
    modifier onlyTeamExist(uint teamId){
        ITeams.Team memory team = Teams.getTeam(teamId);
        require(team.id > 0, "only team exist");
        _;
    }
    modifier onlyContestOwner(uint contestId){
        IContests.Contest memory contest = Contests.getContest(contestId);
        require(contest.owner == msg.sender, "only contest owner");
        _;
    }
    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        require(Contests.contestInState(contestId, state), "wrong contest state");
        _;
    }
    modifier onlyContestGameBox(uint contestId, uint gameBoxId){
        require(contestGameBoxes[contestId].contains(gameBoxId), "only contest's game box");
        _;
    }

}