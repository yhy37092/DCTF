// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface ITeams {

    struct ITeam{
        string name;
        address payable captain;
        address [] members;
    }

    struct Team {
        uint id;
        uint contestId;
        ITeam info;
        TeamState state;
        uint timeStamp;
    }

    enum TeamState{
        DEFAULT,
        APPLIED
    }

    function add(uint contestId, ITeam calldata team) external payable;

    function isContestTeam(uint contestId, uint teamId) view external returns (bool);

    function getMyContestIds() external view returns (uint [] memory);

    function getMyTeamId(uint contestId) external view returns (uint);

    function getTeamId(uint contestId, address account) external view returns (uint);

    function getContestTeamIds(uint contestId) external view returns (uint [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Team memory);

    function getTeam(uint id) external view returns (Team memory);
}