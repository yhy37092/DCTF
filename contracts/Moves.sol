// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IMoves.sol";
import "./ITeams.sol";
import "./IContests.sol";

contract Moves is IMoves {
    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;
    ITeams Teams;

    constructor(address _Contests, address _Teams) {
        Contests = IContests(_Contests);
        Teams = ITeams(_Teams);
    }

    EnumerableSet.UintSet ids;
    mapping(uint => Move) public moves;
    uint public nextId = 1;
    //challengeId => moveId
    mapping(uint => uint) challengeFlag;
    //challengeId => (teamId => moveId)
    mapping(uint => mapping(uint => uint)) submitFlag;

    function _commit(bytes32 hash) internal returns (uint) {
        uint id = nextId;
        ids.add(id);
        moves[id] = Move(id, IMove(hash, "", ""), MoveState.COMMITTED, block.timestamp);
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
        onlyContestOwner(contestId){
            challengeFlag[challengeId] = _commit(hash);
        }
        function commitForMember(uint teamId, uint challengeId, bytes32 hash) external
        onlyTeamMember(teamId){
            submitFlag[challengeId][teamId] = _commit(hash);
        }
        function revealForAdmin(uint contestId, uint challengeId, string memory flag, bytes32 salt) external
        onlyContestOwner(contestId){
            _reveal(challengeFlag[challengeId],flag,salt);
        }
        function revealForMember(uint teamId, uint challengeId, string memory flag, bytes32 salt) external
        onlyTeamMember(teamId){
            _reveal(submitFlag[challengeId][teamId],flag,salt);
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