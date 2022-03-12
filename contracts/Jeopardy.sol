// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IContests.sol";
import "./interfaces/ITeams.sol";
import "./interfaces/IChallenges.sol";
import "./interfaces/IJeopardy.sol";
import "./interfaces/IMoves.sol";

contract Jeopardy is IJeopardy {
    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;
    IChallenges Challenges;
    ITeams Teams;
    IMoves Moves;

    constructor(address _Contests, address _Challenges, address _Teams, address _Moves) {
        Contests = IContests(_Contests);
        Teams = ITeams(_Teams);
        Challenges = IChallenges(_Challenges);
        Moves = IMoves(_Moves);
    }

    // teamID => score
    mapping(uint => uint) scores;

    mapping(uint => uint) challengeIdToFlagMoveId;
    // challengeId => (teamId => moveId)
    mapping(uint => mapping(uint => uint)) challengeIdAndTeamIdToSubmitMoveId;
    mapping(uint => EnumerableSet.UintSet) contestFlags;
    mapping(uint => EnumerableSet.UintSet) contestSubmits;

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function _revealFlag(uint contestId, uint challengeId, string memory flag, bytes32 salt) internal
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        Moves.reveal(challengeIdToFlagMoveId[challengeId], flag, salt);
    }

    function _revealSubmit(uint contestId, uint teamId, uint challengeId, string memory flag, bytes32 salt) internal
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        Moves.reveal(challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId], flag, salt);
    }

    function commitFlag(uint contestId, uint challengeId, bytes32 hash) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = challengeIdToFlagMoveId[challengeId];
        contestFlags[contestId].remove(oldId);
        uint id = Moves.commit(contestId, challengeId, 0, 0, hash);
        challengeIdToFlagMoveId[challengeId] = id;
        contestFlags[contestId].add(id);
    }

    function commitSubmit(uint contestId, uint challengeId, uint teamId, bytes32 hash) external
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId];
        contestSubmits[contestId].remove(oldId);
        uint id = Moves.commit(contestId, challengeId, teamId, 0, hash);
        challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId] = id;
        contestSubmits[contestId].add(id);
    }

    function revealFlags(uint contestId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == flags.length, "length should be equal");
        require(salts.length == flags.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealFlag(contestId, challengeIds[i], flags[i], salts[i]);
        }
    }

    function revealSubmits(uint contestId, uint teamId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == flags.length, "length should be equal");
        require(salts.length == flags.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealSubmit(contestId, teamId, challengeIds[i], flags[i], salts[i]);
        }
    }

    function updateScore(uint contestId) external
    onlyContestInState(contestId, IContests.ContestState.REVEALENDED) {
        uint [] memory submits = contestSubmits[contestId].values();
        uint [] memory flags = contestFlags[contestId].values();
        uint [] memory teams = Teams.getContestTeamIds(contestId);

        for (uint i = 0; i < teams.length; i++) scores[teams[i]] = 0;

        for (uint i = 0; i < submits.length; i++) {
            IMoves.Move memory submitMove = Moves.getMove(submits[i]);
            IMoves.Move memory answerMove;
            for (uint j = 0; j < flags.length; j++) {
                IMoves.Move memory flagMove = Moves.getMove(flags[j]);
                if (submitMove.challengeId == flagMove.challengeId)
                    answerMove = flagMove;
            }
            if (submitMove.state == IMoves.MoveState.REVEALED &&
                answerMove.state == IMoves.MoveState.REVEALED &&
                _compareStrings(submitMove.info.flag, answerMove.info.flag))
                scores[submitMove.teamId] += Challenges.getChallenge(submitMove.challengeId).info.value;
        }
    }

    function getChallengeFlagMoveId(uint challengeId) external view returns (uint) {
        return challengeIdToFlagMoveId[challengeId];
    }

    function getChallengeTeamSubmitMoveId(uint challengeId, uint teamId) external view returns (uint) {
        return challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId];
    }

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory) {
        return contestSubmits[contestId].values();
    }

    function getContestFlagIds(uint contestId) external view returns (uint [] memory) {
        return contestFlags[contestId].values();
    }

    function getScore(uint teamId) external view returns (uint){
        return scores[teamId];
    }

    modifier onlyTeamMember(uint teamId) {
        ITeams.Team memory team = Teams.getTeam(teamId);
        bool result = false;
        if (team.info.captain == msg.sender) result = true;
        for (uint i = 0; i < team.info.members.length; i++)
            if (team.info.members[i] == msg.sender) result = true;
        require(result, "only team captain or member");
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

}