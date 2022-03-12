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

    function _revealFlag(uint contestId, uint challengeId, uint teamId, string memory flag, bytes32 salt) internal
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        Moves.reveal(ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId], flag, salt);
    }

    function _revealSubmit(uint contestId, uint teamId, uint challengeId, uint targetTeamId, string memory flag, bytes32 salt) internal
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        Moves.reveal(ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[challengeId][teamId][targetTeamId], flag, salt);
    }

    function commitFlag(uint contestId, uint challengeId, uint teamId, bytes32 hash) external
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId];
        contestFlags[contestId].remove(oldId);
        uint id = Moves.commit(contestId, challengeId, teamId, 0, hash);
        ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId] = id;
        contestFlags[contestId].add(id);
    }

    function commitSubmit(uint contestId, uint challengeId, uint teamId, uint targetTeamId, bytes32 hash) external
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[challengeId][teamId][targetTeamId];
        contestSubmits[contestId].remove(oldId);
        uint id = Moves.commit(contestId, challengeId, teamId, targetTeamId, hash);
        ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[challengeId][teamId][targetTeamId] = id;
        contestSubmits[contestId].add(id);
    }

    function revealFlags(uint contestId, uint [] memory challengeIds, uint teamId, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == flags.length, "length should be equal");
        require(challengeIds.length == salts.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealFlag(contestId, challengeIds[i], teamId, flags[i], salts[i]);
        }
    }

    function revealSubmits(uint contestId, uint teamId, uint [] memory challengeIds, uint [] memory targetTeamIds, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == targetTeamIds.length, "length should be equal");
        require(challengeIds.length == flags.length, "length should be equal");
        require(challengeIds.length == salts.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealSubmit(contestId, teamId, challengeIds[i], targetTeamIds[i], flags[i], salts[i]);
        }
    }

    function updateScore(uint contestId) external
    onlyContestInState(contestId, IContests.ContestState.REVEALENDED) {
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
    modifier onlyTeamMember(uint teamId) {
        ITeams.Team memory team = Teams.getTeam(teamId);
        bool result = false;
        if (team.info.captain == msg.sender) result = true;
        for (uint i = 0; i < team.info.members.length; i++)
            if (team.info.members[i] == msg.sender) result = true;
        require(result, "only team captain or member");
        _;
    }
    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        require(Contests.contestInState(contestId, state), "wrong contest state");
        _;
    }

}