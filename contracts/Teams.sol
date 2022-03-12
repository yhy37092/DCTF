// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/ITeams.sol";
import "./interfaces/IContests.sol";

contract Teams is ITeams {
    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;

    constructor(address _Contests) {
        Contests = IContests(_Contests);
    }

    EnumerableSet.UintSet ids;
    mapping(uint => Team) public teams;
    uint public nextId = 1;

    mapping(uint => mapping(address => uint)) public addressToTeamId;
    mapping(address => EnumerableSet.UintSet) addressToContests;
    mapping(uint => EnumerableSet.UintSet) contestTeams;

    function add(uint contestId, ITeam calldata team) external payable
    onlyContestExist(contestId)
    onlyNOTTeamMember(addressToTeamId[contestId][msg.sender])
    onlyContestInState(contestId, IContests.ContestState.CREATED) {

        IContests.Contest memory contest = Contests.getContest(contestId);

        require(msg.value == contest.info.fee, "not qualified contest fee");
        require(msg.sender == team.captain, " msg sender should be captain");

        addressToTeamId[contestId][team.captain] = nextId;
        addressToContests[team.captain].add(contestId);
        for (uint i = 0; i < team.members.length; i++) {
            addressToTeamId[contestId][team.members[i]] = nextId;
            addressToContests[team.members[i]].add(contestId);
        }
        contestTeams[contestId].add(nextId);
        ids.add(nextId);
        teams[nextId] = Team(nextId, contestId, team, TeamState.APPLIED, block.timestamp);
        nextId++;
    }

    function getMyContestIds() external view returns (uint [] memory) {
        return addressToContests[msg.sender].values();
    }

    function getMyTeamId(uint contestId) external view returns (uint) {
        return addressToTeamId[contestId][msg.sender];
    }

    function getContestTeamIds(uint contestId) external view returns (uint [] memory) {
        return contestTeams[contestId].values();
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Team memory) {
        return teams[ids.at(index)];
    }

    function getTeam(uint id) external view returns (Team memory) {
        return teams[id];
    }

    modifier onlyContestExist(uint contestId){
        IContests.Contest memory contest = Contests.getContest(contestId);
        require(contest.id > 0, "only contest exist");
        _;
    }
    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        require(Contests.contestInState(contestId, state), "wrong contest state");
        _;
    }
    modifier onlyNOTTeamMember(uint teamId) {
        ITeams.Team memory team = teams[teamId];
        bool result = true;
        if (team.info.captain == msg.sender) result = false;
        for (uint i = 0; i < team.info.members.length; i++)
            if (team.info.members[i] == msg.sender) result = false;
        require(result, "only not team captain or member");
        _;
    }
}