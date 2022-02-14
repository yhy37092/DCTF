// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./ITeams.sol";
import "./IContests.sol";

contract Teams is ITeams {
    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;

    constructor(address _Contests) {
        Contests = IContests(_Contests);
    }

    //ContestId => TeamIds
    EnumerableSet.UintSet ids;
    //TeamId => Team
    mapping(uint => Team) public teams;
    uint public nextId = 1;
    mapping(uint => mapping(address => uint)) addressToTeamId;
    mapping(uint => EnumerableSet.UintSet) contestTeams;

    function _gets(uint [] memory _ids) internal view returns (Team [] memory) {
        uint number = _ids.length;
        Team [] memory result = new Team [](number);
        for (uint i = 0; i < number; i++) {
            result[i] = teams[_ids[i]];
        }
        return result;
    }

    function _add(uint contestId, ITeam calldata team) internal returns (uint) {
        uint id = nextId;
        ids.add(id);
        teams[id] = Team(id, contestId, team, TeamState.APPLIED, block.timestamp);
        nextId++;
        return id;
    }

    function applyContest(uint contestId, ITeam calldata team) external payable
    onlyContestExist(contestId) {
        uint [] memory _ids = new uint [] (1);
        _ids[0] = contestId;
        IContests.Contest memory contest = Contests.getSome(_ids)[0];
        require(msg.value == contest.contestInfo.fee, "not qualified contest fee");
        addressToTeamId[contestId][team.captain] = nextId;
        for (uint i = 0; i < team.members.length; i++) {
            addressToTeamId[contestId][team.members[i]] = nextId;
        }
        contestTeams[contestId].add(_add(contestId, team));
    }

    function auditTeam(uint contestId, uint teamId, bool result) external
    onlyContestOwner(contestId) {
        require(teams[teamId].state == ITeams.TeamState.APPLIED, "wrong team state");
        if (result == true) {
            teams[teamId].state = ITeams.TeamState.APPROVED;
            return;
        }
        uint [] memory _ids = new uint [] (1);
        _ids[0] = contestId;
        IContests.Contest memory contest = Contests.getSome(_ids)[0];
        teams[teamId].state = ITeams.TeamState.REJECTED;
        teams[teamId].teamInfo.captain.transfer(contest.contestInfo.fee);
    }

    function isTeamMember(uint teamId, address account) external view returns(bool) {
        if(teams[teamId].teamInfo.captain == account) return true;
        for (uint i = 0; i < teams[teamId].teamInfo.members.length; i++) {
            if(teams[teamId].teamInfo.members[i] == account) return true;
        }
        return false;
    }

    function getAll() external view returns (Team [] memory) {
        return _gets(ids.values());
    }

    function getSome(uint [] memory _ids) external view returns (Team [] memory) {
        return _gets(_ids);
    }

    function gets(uint contestId) external view returns (Team [] memory) {
        return _gets(contestTeams[contestId].values());
    }

    function getOne(uint contestId, address account) external view returns (Team memory) {
        return teams[addressToTeamId[contestId][account]];
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Team memory) {
        return teams[ids.at(index)];
    }

    modifier onlyTeamExist(uint id){
        require(ids.contains(id), "team does not exist");
        _;
    }

    modifier onlyContestOwner(uint contestId){
        require(Contests.isOwner(contestId, msg.sender), "only contest owner");
        _;
    }

    modifier onlyContestExist(uint contestId){
        require(Contests.Exist(contestId), "only contest exist");
        _;
    }
}