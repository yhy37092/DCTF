// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface IJeopardy {
    function commitFlag(uint contestId, uint challengeId, bytes32 hash) external;

    function commitSubmit(uint contestId, uint challengeId, uint teamId, bytes32 hash) external;

    function revealFlags(uint contestId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external;

    function revealSubmits(uint contestId, uint teamId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external;

    function updateScore(uint contestId) external;

    function getChallengeFlagMoveId(uint challengeId) external view returns (uint);

    function getChallengeTeamSubmitMoveId(uint challengeId, uint teamId) external view returns (uint);

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory);

    function getContestFlagIds(uint contestId) external view returns (uint [] memory);

    function getScore(uint teamId) external view returns (uint);
}