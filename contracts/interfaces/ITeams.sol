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

    function add(uint, ITeam calldata) external payable;

    function isContestTeam(uint, uint) view external returns (bool);

    function getMyContestIds() external view returns (uint [] memory);

    function getMyTeamId(uint) external view returns (uint);

    function getTeamId(uint, address) external view returns (uint);

    function getContestTeamIds(uint) external view returns (uint [] memory);

    function getCount() external view returns (uint);

    function get(uint) external view returns (Team memory);

    function getTeam(uint) external view returns (Team memory);
}