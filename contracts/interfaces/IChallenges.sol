// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

pragma experimental ABIEncoderV2;

interface IChallenges {

    struct IChallenge {
        string challengeType;
        string name;
        string category;
        string message;
        string connectionInfo;
        string file;
        string hint;
        uint value;
    }

    struct Challenge {
        uint id;
        uint contestId;
        IChallenge info;
        uint timeStamp;
    }

    function add(uint, IChallenge calldata) external;

    function update(uint, uint, IChallenge calldata) external;

    function remove(uint, uint) external;

    function removes(uint, uint [] memory) external;

    function isContestChallenge(uint, uint) view external returns (bool);

    function getContestChallengeIds(uint) external view returns (uint [] memory);

    function getChallenge(uint) external view returns (Challenge memory);

    function getCount() external view returns (uint);

    function get(uint) external view returns (Challenge memory);

}