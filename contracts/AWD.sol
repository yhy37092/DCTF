// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IMoves.sol";
import "./interfaces/IContests.sol";
import "./interfaces/ITeams.sol";
import "./interfaces/IChallenges.sol";
import "./interfaces/IAWD.sol";

contract AWD is IAWD {
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

    mapping(uint => mapping(uint => uint)) ChallengeIdAndTeamIdToFlagMoveId;
    mapping(uint => mapping(uint => mapping(uint => uint))) ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId;
    mapping(uint => EnumerableSet.UintSet) contestFlags;
    mapping(uint => EnumerableSet.UintSet) contestSubmits;

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function _commitFlag(IMoves.CommitData memory data) internal
    challengeQualified(data.basic.contestId, data.basic.challengeId)
    teamQualified(data.basic.contestId, data.basic.teamId, ITeams.TeamState.APPLIED)
    onlyContestInState(data.basic.contestId, IContests.ContestState.FLAGCOMMIT) {
        uint oldId = ChallengeIdAndTeamIdToFlagMoveId[data.basic.challengeId][data.basic.teamId];
        contestFlags[data.basic.contestId].remove(oldId);
        uint moveId = Moves.commit(data);
        ChallengeIdAndTeamIdToFlagMoveId[data.basic.challengeId][data.basic.teamId] = moveId;
        contestFlags[data.basic.contestId].add(moveId);
    }

    function _commitSubmit(IMoves.CommitData memory data) internal
    challengeQualified(data.basic.contestId, data.basic.challengeId)
    teamQualified(data.basic.contestId, data.basic.teamId, ITeams.TeamState.APPLIED)
    onlyContestInState(data.basic.contestId, IContests.ContestState.SUBMITCOMMIT) {
        uint oldId = ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[data.basic.challengeId][data.basic.teamId][data.basic.targetTeamId];
        contestSubmits[data.basic.contestId].remove(oldId);
        uint moveId = Moves.commit(data);
        ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[data.basic.challengeId][data.basic.teamId][data.basic.targetTeamId] = moveId;
        contestSubmits[data.basic.contestId].add(moveId);
    }

    function _revealFlag(IMoves.RevealData memory data) internal
    challengeQualified(data.basic.contestId, data.basic.challengeId)
    teamQualified(data.basic.contestId, data.basic.teamId, ITeams.TeamState.APPLIED)
    onlyContestInState(data.basic.contestId, IContests.ContestState.REVEAL) {
        Moves.reveal
        (
            ChallengeIdAndTeamIdToFlagMoveId[data.basic.challengeId][data.basic.teamId],
            data.flag,
            data.salt
        );
    }

    function _revealSubmit(IMoves.RevealData memory data) internal
    challengeQualified(data.basic.contestId, data.basic.challengeId)
    teamQualified(data.basic.contestId, data.basic.teamId, ITeams.TeamState.APPLIED)
    onlyContestInState(data.basic.contestId, IContests.ContestState.REVEAL) {
        Moves.reveal
        (
            ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[data.basic.challengeId][data.basic.teamId][data.basic.targetTeamId],
            data.flag,
            data.salt
        );
    }

    function commitFlag(IMoves.CommitData memory data) external {
        _commitFlag(data);
    }

    function commitSubmit(IMoves.CommitData memory data) external {
        _commitSubmit(data);
    }


    function revealFlag(IMoves.RevealData memory data) external {
        _revealFlag(data);
    }

    function revealSubmit(IMoves.RevealData memory data) external {
        _revealSubmit(data);
    }

    function revealFlags(IMoves.RevealData [] memory data) external {
        for (uint i = 0; i < data.length; i++)
            _revealFlag(data[i]);
    }

    function revealSubmits(IMoves.RevealData [] memory data) external {
        for (uint i = 0; i < data.length; i++)
            _revealSubmit(data[i]);
    }

    function updateScore(uint contestId) external
    onlyContestInState(contestId, IContests.ContestState.END) {
        uint [] memory submits = contestSubmits[contestId].values();
        uint [] memory flags = contestFlags[contestId].values();
        uint [] memory teams = Teams.getContestTeamIds(contestId);
        uint [] memory challenges = Challenges.getContestChallengeIds(contestId);

        uint score = 0;
        for (uint i = 0; i < challenges.length; i++) score += Challenges.getChallenge(challenges[i]).info.value;

        for (uint i = 0; i < teams.length; i++) scores[teams[i]] = score;

        for (uint i = 0; i < submits.length; i++) {
            IMoves.Move memory submitMove = Moves.getMove(submits[i]);
            IMoves.Move memory answerMove;
            for (uint j = 0; j < flags.length; j++) {
                IMoves.Move memory flagMove = Moves.getMove(flags[j]);
                if (submitMove.challengeId == flagMove.challengeId &&
                    submitMove.targetTeamId == flagMove.teamId)
                    answerMove = flagMove;
            }
            if (submitMove.state == IMoves.MoveState.REVEALED &&
            answerMove.state == IMoves.MoveState.REVEALED &&
                _compareStrings(submitMove.info.flag, answerMove.info.flag)) {
                scores[submitMove.teamId] += 50;
                scores[submitMove.targetTeamId] -= 50;
            }
        }
    }

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory) {
        return contestSubmits[contestId].values();
    }

    function getChallengeTeamFlagMoveId(uint challengeId, uint teamId) external view returns (uint) {
        return ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId];
    }

    function getChallengeTeamTargetTeamSubmitMoveId(uint challengeId, uint teamId, uint targetTeam) external view returns (uint){
        return ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[challengeId][teamId][targetTeam];
    }

    function getContestFlagIds(uint contestId) external view returns (uint [] memory) {
        return contestFlags[contestId].values();
    }

    function getScore(uint teamId) external view returns (uint){
        return scores[teamId];
    }

    modifier challengeQualified(uint contestId, uint challengeId) {
        require(Challenges.isContestChallenge(contestId, challengeId), "only contest challenge");
        _;
    }

    modifier teamQualified(uint contestId, uint teamId, ITeams.TeamState state) {
        require(Teams.isContestTeam(contestId, teamId), "only contest team");
        require(Teams.getTeamId(contestId, msg.sender) == teamId, "wrong team ID");
        ITeams.Team memory team = Teams.getTeam(teamId);
        bool result = false;
        if (team.info.captain == msg.sender) result = true;
        for (uint i = 0; i < team.info.members.length; i++)
            if (team.info.members[i] == msg.sender) result = true;
        require(result, "only team captain or member");
        require(team.state == state, "wrong team state");
        _;
    }

    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        require(Contests.contestInState(contestId, state), "wrong contest state");
        _;
    }

}