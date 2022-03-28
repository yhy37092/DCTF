// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IMoves.sol";
import "./interfaces/IContests.sol";
import "./interfaces/ITeams.sol";
import "./interfaces/IChallenges.sol";

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
    mapping(uint => Move) moves;
    uint public nextId = 1;

    mapping(bytes32 => bool) hashes;

    function commit(uint contestId, uint challengeId, uint teamId, uint targetTeamId, bytes32 hash) external returns (uint) {
        require(hashes[hash] == false, "hash in use");
        hashes[hash] = true;
        uint id = nextId;
        ids.add(id);
        moves[id] = Move(id, contestId, challengeId, teamId, targetTeamId, IMove(hash, "", ""), MoveState.COMMITTED, block.timestamp);
        nextId++;
        return id;
    }

    function reveal(uint id, string memory flag, bytes32 salt) external {
        require(moves[id].state == IMoves.MoveState.COMMITTED, "already revealed");
        require(moves[id].info.hash == keccak256(abi.encodePacked(flag, salt)), "does not match commitment");
        moves[id].info.flag = flag;
        moves[id].info.salt = salt;
        moves[id].state = MoveState.REVEALED;
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Move memory) {
        return moves[ids.at(index)];
    }

    function getMove(uint id) external view returns (Move memory) {
        return moves[id];
    }

}