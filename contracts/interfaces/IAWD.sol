// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IMoves.sol";
pragma experimental ABIEncoderV2;

interface IAWD {
    function commitFlag(IMoves.CommitData memory) external;

    function commitSubmit(IMoves.CommitData memory) external;

    function revealFlag(IMoves.RevealData memory) external;

    function revealSubmit(IMoves.RevealData memory) external;

    function revealFlags(IMoves.RevealData [] memory) external;

    function revealSubmits(IMoves.RevealData [] memory) external;

    function updateScore(uint) external;

    function getContestSubmitIds(uint) external view returns (uint [] memory);

    function getChallengeTeamFlagMoveId(uint, uint) external view returns (uint);

    function getChallengeTeamTargetTeamSubmitMoveId(uint, uint, uint) external view returns (uint);

    function getContestFlagIds(uint) external view returns (uint [] memory);

    function getScore(uint) external view returns (uint);
}