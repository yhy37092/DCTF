// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IMoves.sol";
import "./IContests.sol";
import "./ITeams.sol";
import "./IChallenges.sol";

contract Moves is IMoves {
    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;
    IChallenges Challenges;
    ITeams Teams;

    constructor(address _Contests, address _Challenges, address _Teams) {
        Contests = IContests(_Contests);
        Teams = ITeams(_Teams);
        Challenges = IChallenges(_Challenges);
    }

    EnumerableSet.UintSet ids;
    mapping(uint => Move) public moves;
    uint public nextId = 1;

    // index
    //challengeId => moveId
    mapping(uint => uint) challengeFlag;
    //challengeId => (teamId => moveId)
    mapping(uint => mapping(uint => uint)) submitFlag;
    // contest flags
    mapping(uint => EnumerableSet.UintSet) contestFlags;
    // contest submit
    mapping(uint => EnumerableSet.UintSet) contestSubmits;

    function _commit(uint contestId, uint challengeId, uint teamId, bytes32 hash) internal returns (uint) {
        uint id = nextId;
        ids.add(id);
        moves[id] = Move(id, contestId, challengeId, teamId, IMove(hash, "", ""), MoveState.COMMITTED, block.timestamp);
        nextId++;
        return id;
    }

    function _reveal(uint id, string memory flag, bytes32 salt) internal {
        require(moves[id].state == IMoves.MoveState.COMMITTED, "already revealed");
        require(moves[id].moveInfo.hash == keccak256(abi.encodePacked(flag, salt)), "does not match commitment");
        moves[id].moveInfo.flag = flag;
        moves[id].moveInfo.salt = salt;
        moves[id].state = MoveState.REVEALED;
    }

    function commitForAdmin(uint contestId, uint challengeId, bytes32 hash) external
    onlyContestOwner(contestId) {
        uint oldId = challengeFlag[challengeId];
        contestFlags[contestId].remove(oldId);
        delete moves[oldId];
        uint id =_commit(contestId, challengeId, 0, hash);
        challengeFlag[challengeId] = id;
        contestFlags[contestId].add(id);
    }

    function commitForMember(uint contestId, uint teamId, uint challengeId, bytes32 hash) external
    onlyTeamMember(teamId) {
        uint oldId = submitFlag[challengeId][teamId];
        contestSubmits[contestId].remove(oldId);
        delete moves[oldId];
        uint id = _commit(contestId, challengeId, teamId, hash);
        submitFlag[challengeId][teamId] = id;
        contestSubmits[contestId].add(id);
    }

    function revealForAdmin(uint contestId, uint challengeId, string memory flag, bytes32 salt) external
    onlyContestOwner(contestId) {
        _reveal(challengeFlag[challengeId], flag, salt);
    }

    function revealForMember(uint contestId, uint teamId, uint challengeId, string memory flag, bytes32 salt) external
    onlyTeamMember(teamId) {
        _reveal(submitFlag[challengeId][teamId], flag, salt);
    }

    function _gets(uint [] memory _ids) internal view returns (Move [] memory) {
        uint number = _ids.length;
        Move [] memory result = new Move [](number);
        for (uint i = 0; i < number; i++) {
            result[i] = moves[_ids[i]];
        }
        return result;
    }

    function gets(uint contestId) external view returns (Move [] memory) {
        return _gets(contestSubmits[contestId].values());
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Move memory) {
        return  moves[ids.at(index)];
    }

    modifier onlyTeamMember(uint teamId) {
        require(Teams.isTeamMember(teamId, msg.sender), "only team member");
        _;
    }

    modifier onlyContestOwner(uint contestId){
        require(Contests.isOwner(contestId, msg.sender), "only contest owner");
        _;
    }

}