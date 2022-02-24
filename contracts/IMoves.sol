// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface IMoves {

    struct IMove{
        bytes32 hash;
        string flag;
        bytes32 salt;
    }

    struct Move {
        uint id;
        uint contestId;
        uint challengeId;
        uint teamId;
        IMove info;
        MoveState state;
        uint timeStamp;
    }

    enum MoveState{
        DEFAULT,
        COMMITTED,
        REVEALED
    }

    function commitForAdmin(uint contestId, uint challengeId, bytes32 hash) external;

    function commitForMember(uint contestId, uint teamId, uint challengeId, bytes32 hash) external;

    function revealForAdmins(uint contestId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external;

    function revealForMembers(uint contestId, uint teamId, uint [] memory challengeIds, string [] memory flags, bytes32 [] memory salts) external;

    function getChallengeAnswerMoveId(uint challengeId) external view returns (uint);

    function getChallengeTeamSubmitMoveId(uint challengeId, uint teamId) external view returns (uint);

    function getContestSubmitIds(uint contestId) external view returns (uint [] memory);

    function getContestAnswerIds(uint contestId) external view returns (uint [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Move memory);

    function getMove(uint id) external view returns (Move memory);

}