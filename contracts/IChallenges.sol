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
        IChallenge challengeInfo;
        uint timeStamp;
    }

    function add(uint contestId, IChallenge calldata challenge) external;

    function update(uint contestId, uint id, IChallenge calldata challenge) external;

    function remove(uint contestId, uint id) external;

    function getAll() external view returns (Challenge [] memory);

    function getSome(uint [] calldata _ids) external view returns (Challenge [] memory);

    function gets(uint contestId) external view returns (Challenge [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Challenge memory);

}