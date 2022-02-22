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

    EnumerableSet.UintSet ids;
    mapping(uint => Challenge) public challenges;
    uint public nextId = 1;

    mapping(uint => EnumerableSet.UintSet) contestChallenges;

    function _remove(uint contestId, uint id) internal
    onlyChallengeExist(id)
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        ids.remove(id);
        contestChallenges[contestId].remove(id);
        delete challenges[id];
    }

    function add(uint contestId, IChallenge calldata challenge) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.STARTED) {
        ids.add(nextId);
        contestChallenges[contestId].add(nextId);
        challenges[nextId] = Challenge(nextId, contestId, challenge, block.timestamp);
        nextId++;
    }

    function update(uint contestId, uint id, IChallenge calldata challenge) external
    onlyChallengeExist(id)
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.STARTED){
        challenges[id].info = challenge;
    }

    function removes(uint contestId, uint [] memory _ids) external {
        for (uint i = 0; i < _ids.length; i++) {
            _remove(contestId, _ids[i]);
        }
    }

    function getContestChallengeIds(uint contestId) external view returns (uint [] memory){
        return contestChallenges[contestId].values();
    }

    function getChallenge(uint id) external view returns (Challenge memory) {
        return challenges[id];
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Challenge memory) {
        return challenges[ids.at(index)];
    }

    modifier onlyChallengeExist(uint id){
        require(challenges[id].id > 0, "challenge does not exist");
        _;
    }
    modifier onlyContestOwner(uint contestId){
        IContests.Contest memory contest = Contests.getContest(contestId);
        require(contest.owner == msg.sender, "only contest owner");
        _;
    }
    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        require(Contests.contestInState(contestId, state), "wrong contest state");
        _;
    }
}