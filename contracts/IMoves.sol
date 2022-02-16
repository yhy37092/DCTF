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
        IMove moveInfo;
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

    function revealForAdmin(uint contestId, uint challengeId, string memory flag, bytes32 salt) external;

    function revealForMember(uint contestId, uint teamId, uint challengeId, string memory flag, bytes32 salt) external;

    function gets(uint contestId) external view returns (Move [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Move memory);

}