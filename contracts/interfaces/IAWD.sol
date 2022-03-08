// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface IAWD {
    function commitFlag(uint contestId, uint challengeId, uint teamId, bytes32 hash) external;

    function commitSubmit(uint contestId, uint challengeId, uint teamId, uint targetTeamId, bytes32 hash) external;

    function revealFlags(uint contestId, uint [] memory challengeIds, uint teamId, string [] memory flags, bytes32 [] memory salts) external;

    function revealSubmits(uint contestId, uint teamId, uint [] memory challengeIds, uint [] memory targetTeamIds, string [] memory flags, bytes32 [] memory salts) external;

    function updateScore(uint contestId) external;

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory);

    function getChallengeTeamFlagMoveId(uint challengeId, uint teamId) external view returns (uint);

    function getChallengeTeamTargetTeamSubmitMoveId(uint challengeId, uint teamId, uint targetTeam) external view returns (uint);

    function getContestFlagIds(uint contestId) external view returns (uint [] memory);

    function getScore(uint teamId) external view returns (uint);
}