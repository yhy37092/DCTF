// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IMoves.sol";
pragma experimental ABIEncoderV2;

interface IJeopardy {
    function commitFlag(IMoves.CommitData memory data) external;

    function commitSubmit(IMoves.CommitData memory data) external;

    function revealFlag(IMoves.RevealData memory data) external;

    function revealSubmit(IMoves.RevealData memory data) external;

    function revealFlags(IMoves.RevealData [] memory data) external;

    function revealSubmits(IMoves.RevealData [] memory data) external;

    function updateScore(uint contestId) external;

    function getChallengeFlagMoveId(uint challengeId) external view returns (uint);

    function getChallengeTeamSubmitMoveId(uint challengeId, uint teamId) external view returns (uint);

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory);

    function getContestFlagIds(uint contestId) external view returns (uint [] memory);

    function getScore(uint teamId) external view returns (uint);
}