// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IMoves.sol";
pragma experimental ABIEncoderV2;

interface IAWD {
    function commitFlag(IMoves.CommitData memory data) external;

    function commitSubmit(IMoves.CommitData memory data) external;

    function revealFlag(IMoves.RevealData memory data) external;

    function revealSubmit(IMoves.RevealData memory data) external;

    function revealFlags(IMoves.RevealData [] memory data) external;

    function revealSubmits(IMoves.RevealData [] memory data) external;

    function updateScore(uint contestId) external;

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory);

    function getChallengeTeamFlagMoveId(uint challengeId, uint teamId) external view returns (uint);

    function getChallengeTeamTargetTeamSubmitMoveId(uint challengeId, uint teamId, uint targetTeam) external view returns (uint);

    function getContestFlagIds(uint contestId) external view returns (uint [] memory);

    function getScore(uint teamId) external view returns (uint);
}