// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

pragma experimental ABIEncoderV2;

interface IGameBoxes {

    struct IGameBox {
        string ip;
        uint port;
        uint Flag_SSH_Port;
        string Flag_SSH_User_Name;
        string Flag_SSH_Password;
    }

    struct GameBox {
        uint id;
        uint contestId;
        uint challengeId;
        uint teamId;
        IGameBox info;
        uint timeStamp;
    }

    function add(uint, uint, uint, IGameBox calldata) external;

    function update(uint, uint, IGameBox calldata) external;

    function remove(uint, uint) external;

    function removes(uint, uint [] memory) external;

    function isContestGameBox(uint, uint) view external returns (bool);

    function getContestGameBoxIds(uint) external view returns (uint [] memory);

    function getChallengeTeamGameBoxId(uint, uint) external view returns (uint);

    function getGameBox(uint) external view returns (GameBox memory);

    function getCount() external view returns (uint);

    function get(uint) external view returns (GameBox memory);
}