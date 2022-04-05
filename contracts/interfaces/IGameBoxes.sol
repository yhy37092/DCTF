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

    function add(uint contestId, uint challengeId, uint teamId, IGameBox calldata env) external;

    function update(uint contestId, uint id, IGameBox calldata env) external;

    function remove(uint contestId, uint id) external;

    function removes(uint contestId, uint [] memory _ids) external;

    function isContestGameBox(uint contestId, uint gameBoxId) view external returns (bool);

    function getContestGameBoxIds(uint contestId) external view returns (uint [] memory);

    function getChallengeTeamGameBoxId(uint challengeId, uint teamId) external view returns (uint);

    function getGameBox(uint id) external view returns (GameBox memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (GameBox memory);
}