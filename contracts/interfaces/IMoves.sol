// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface IMoves {

    struct IMove{
        bytes32 hash;
        string flag;
        bytes32 salt;
    }

    struct basicData{
        uint contestId;
        uint challengeId;
        uint teamId;
        uint targetTeamId;
    }

    struct CommitData{
        basicData basic;
        bytes32 hash;
    }

    struct RevealData{
        basicData basic;
        string flag;
        bytes32 salt;
    }

    struct Move {
        uint id;
        uint contestId;
        uint challengeId;
        uint teamId;
        uint targetTeamId;
        IMove info;
        MoveState state;
        uint timeStamp;
    }

    enum MoveState{
        DEFAULT,
        COMMITTED,
        REVEALED
    }
    function commit(CommitData memory data) external returns (uint);

    function reveal(uint id, string memory flag, bytes32 salt) external;

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Move memory);

    function getMove(uint id) external view returns (Move memory);

}