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
        uint score;
        uint timeStamp;
    }

    enum TeamState{
        DEFAULT,
        APPLIED,
        APPROVED,
        REJECTED
    }

    function applyContest(uint contestId, ITeam calldata team) external payable;

    function auditTeams(uint contestId, uint [] memory _ids, bool [] memory results) external;

    function updateScore(uint contestId, uint [] memory teamIds, uint [] memory scores) external;

    function isTeamMember(uint teamId, address account) external view returns(bool);

    function getApply() external view returns (uint [] memory);

    function getAll() external view returns (Team [] memory);

    function getSome(uint [] memory _ids) external view returns (Team [] memory);

    function gets(uint contestId) external view returns (Team [] memory);

    function getsId(uint contestId) external view returns (uint [] memory);

    function getOne(uint contestId, address account) external view returns (Team memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Team memory);

}