// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;


import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IChallenges.sol";
import "./IContests.sol";

contract Challenges is IChallenges{

    using EnumerableSet for EnumerableSet.UintSet;

    IContests Contests;

    constructor(address _Contests) {
        Contests = IContests(_Contests);
    }

    //ContestId  => challengeIds
    EnumerableSet.UintSet ids;
    //ChallengeId => Challenge
    mapping(uint => Challenge) public challenges;
    uint public nextId = 1;

    // index
    // contestId => challengeIds
    mapping(uint => EnumerableSet.UintSet) contestChallenges;

    function _gets(uint [] memory _ids) internal view returns (Challenge [] memory) {
        uint number = _ids.length;
        Challenge [] memory result = new Challenge [] (number);
        for(uint i = 0; i < number; i++) {
            result[i] = challenges[_ids[i]];
        }
        return result;
    }

    function add(uint contestId, IChallenge calldata challenge) external
    onlyContestOwner(contestId) {
        ids.add(nextId);
        contestChallenges[contestId].add(nextId);
        challenges[nextId] = Challenge(nextId, contestId, challenge, block.timestamp);
        nextId++;
    }

    function update(uint contestId, uint id, IChallenge calldata challenge) external
    onlyChallengeExist(id)
    onlyContestOwner(contestId) {
        challenges[id].challengeInfo = challenge;
    }

    function remove(uint contestId, uint id) external
    onlyChallengeExist(id)
    onlyContestOwner(contestId) {
        ids.remove(id);
        contestChallenges[contestId].remove(id);
        delete challenges[id];
    }

    function getAll() external view returns (Challenge [] memory) {
        return _gets(ids.values());
    }

    function getSome(uint [] memory _ids) external view returns (Challenge [] memory) {
        return _gets(_ids);
    }

    function gets(uint contestId) external view returns (Challenge [] memory){
        return _gets(contestChallenges[contestId].values());
    }
    function getsId(uint contestId) external view returns (uint [] memory){
        return contestChallenges[contestId].values();
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Challenge memory) {
        return challenges[ids.at(index)];
    }

    modifier onlyChallengeExist(uint id){
        require(ids.contains(id), "challenge does not exist");
        _;
    }
    modifier onlyContestOwner(uint contestId){
        require(Contests.isOwner(contestId, msg.sender), "only contest owner");
        _;
    }
}