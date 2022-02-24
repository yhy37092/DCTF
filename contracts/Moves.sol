// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IMoves.sol";
import "./IContests.sol";
import "./ITeams.sol";
import "./IChallenges.sol";

contract Moves is IMoves {
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
    mapping(uint => Move) moves;
    uint public nextId = 1;

    // teamID => score
    mapping(uint => uint) scores;

    mapping(uint => uint) challengeIdToAnswerMoveId;
    // challengeId => (teamId => moveId)
    mapping(uint => mapping(uint => uint)) challengeIdAndTeamIdToSubmitMoveId;
    mapping(uint => EnumerableSet.UintSet) contestAnswers;
    mapping(uint => EnumerableSet.UintSet) contestSubmits;

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function _commit(uint contestId, uint challengeId, uint teamId, bytes32 hash) internal returns (uint) {
        uint id = nextId;
        ids.add(id);
        moves[id] = Move(id, contestId, challengeId, teamId, IMove(hash, "", ""), MoveState.COMMITTED, block.timestamp);
        nextId++;
        return id;
    }

    function _reveal(uint id, string memory flag, bytes32 salt) internal {
        require(moves[id].state == IMoves.MoveState.COMMITTED, "already revealed");
        require(moves[id].info.hash == keccak256(abi.encodePacked(flag, salt)), "does not match commitment");
        moves[id].info.flag = flag;
        moves[id].info.salt = salt;
        moves[id].state = MoveState.REVEALED;
    }

    function _revealForAdmin(uint contestId, uint challengeId, string memory flag, bytes32 salt) internal
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        _reveal(challengeIdToAnswerMoveId[challengeId], flag, salt);
    }

    function _revealForMember(uint contestId, uint teamId, uint challengeId, string memory flag, bytes32 salt) internal
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.COMMITENDED) {
        _reveal(challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId], flag, salt);
    }

    function commitForAdmin(uint contestId, uint challengeId, bytes32 hash) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = challengeIdToAnswerMoveId[challengeId];
        contestAnswers[contestId].remove(oldId);
        delete moves[oldId];
        uint id = _commit(contestId, challengeId, 0, hash);
        challengeIdToAnswerMoveId[challengeId] = id;
        contestAnswers[contestId].add(id);
    }

    function commitForMember(uint contestId, uint teamId, uint challengeId, bytes32 hash) external
    onlyTeamMember(teamId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        uint oldId = challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId];
        contestSubmits[contestId].remove(oldId);
        delete moves[oldId];
        uint id = _commit(contestId, challengeId, teamId, hash);
        challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId] = id;
        contestSubmits[contestId].add(id);
    }

    function revealForAdmins(uint contestId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == flags.length, "length should be equal");
        require(salts.length == flags.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealForAdmin(contestId, challengeIds[i], flags[i], salts[i]);
        }
    }

    function revealForMembers(uint contestId, uint teamId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external {
        require(challengeIds.length == flags.length, "length should be equal");
        require(salts.length == flags.length, "length should be equal");
        for (uint i = 0; i < challengeIds.length; i++) {
            _revealForMember(contestId, teamId, challengeIds[i], flags[i], salts[i]);
        }
    }

    function updateScore(uint contestId) external
    onlyContestInState(contestId, IContests.ContestState.REVEALENDED) {
        uint [] memory submits = contestSubmits[contestId].values();
        uint [] memory answers = contestAnswers[contestId].values();

        for (uint i = 0; i < submits.length; i++) scores[moves[submits[i]].teamId] = 0;

        for (uint i = 0; i < submits.length; i++) {
            Move memory submitMove = moves[submits[i]];
            Move memory answerMove;
            for (uint j = 0; j < answers.length; j++)
                if (submitMove.challengeId == moves[answers[j]].challengeId)
                    answerMove = moves[answers[j]];
            if (submitMove.state == IMoves.MoveState.REVEALED && answerMove.state == IMoves.MoveState.REVEALED && _compareStrings(submitMove.info.flag, answerMove.info.flag))
                scores[submitMove.teamId] += Challenges.getChallenge(submitMove.challengeId).info.value;
        }
    }

    function getChallengeAnswerMoveId(uint challengeId) external view returns (uint) {
        return challengeIdToAnswerMoveId[challengeId];
    }

    function getChallengeTeamSubmitMoveId(uint challengeId, uint teamId) external view returns (uint) {
        return challengeIdAndTeamIdToSubmitMoveId[challengeId][teamId];
    }

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory) {
        return contestSubmits[contestId].values();
    }

    function getContestAnswerIds(uint contestId) external view returns (uint [] memory) {
        return contestAnswers[contestId].values();
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Move memory) {
        return moves[ids.at(index)];
    }

    function getMove(uint id) external view returns (Move memory) {
        return moves[id];
    }

    function getScore(uint teamId) external view returns(uint){
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