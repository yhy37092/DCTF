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

    function commit(CommitData memory data) external returns (uint) {
        require(hashes[data.hash] == false, "hash in use");
        hashes[data.hash] = true;
        uint moveId = nextId;
        ids.add(moveId);
        moves[moveId] = Move(
            moveId,
            data.basic.contestId,
            data.basic.challengeId, 
            data.basic.teamId,
            data.basic.targetTeamId, 
            IMove(data.hash, "", ""), 
            MoveState.COMMITTED, 
            block.timestamp
            );
        nextId++;
        return moveId;
    }

    function reveal(uint moveId, string memory flag, bytes32 salt) external {
        require(moves[moveId].state == IMoves.MoveState.COMMITTED, "already revealed");
        require(moves[moveId].info.hash == keccak256(abi.encodePacked(flag, salt)), "does not match commitment");
        moves[moveId].info.flag = flag;
        moves[moveId].info.salt = salt;
        moves[moveId].state = MoveState.REVEALED;
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Move memory) {
        return moves[ids.at(index)];
    }

    function getMove(uint moveId) external view returns (Move memory) {
        return moves[moveId];
    }

}