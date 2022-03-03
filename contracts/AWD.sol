// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IMoves.sol";
import "./IContests.sol";
import "./ITeams.sol";
import "./IChallenges.sol";
import "./IAWD.sol";

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
    {
        Moves.reveal(ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId], flag, salt);
    }

    function _revealSubmit(uint contestId, uint teamId, uint challengeId, uint targetTeamId, string memory flag, bytes32 salt) internal
    {
        Moves.reveal(ChallengeIdTeamIdAndTargetTeamIdToSubmitMoveId[challengeId][teamId][targetTeamId], flag, salt);
    }

    function commitFlag(uint contestId, uint challengeId, uint teamId, bytes32 hash) external
    {
        uint oldId = ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId];
        contestFlags[contestId].remove(oldId);
        uint id = Moves.commit(contestId, challengeId, teamId, 0, hash);
        ChallengeIdAndTeamIdToFlagMoveId[challengeId][teamId] = id;
        contestFlags[contestId].add(id);
    }

    function commitSubmit(uint contestId, uint challengeId, uint teamId, uint targetTeamId, bytes32 hash) external
    {
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

    function updateScore(uint contestId) external {

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

}