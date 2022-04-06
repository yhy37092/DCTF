// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;


import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IChallenges.sol";
import "./interfaces/IContests.sol";

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

    function _remove(uint contestId, uint challengeId) internal
    onlyContestOwner(contestId)
    onlyContestChallenge(contestId, challengeId)
    onlyContestInState(contestId, IContests.ContestState.CREATE) {
        ids.remove(challengeId);
        contestChallenges[contestId].remove(challengeId);
        delete challenges[challengeId];
    }

    function add(uint contestId, IChallenge calldata challenge) external
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE) {
        ids.add(nextId);
        contestChallenges[contestId].add(nextId);
        challenges[nextId] = Challenge(nextId, contestId, challenge, '', block.timestamp);
        nextId++;
    }

    function addKey(uint contestId, uint challengeId, string memory key) external
    onlyChallengeExist(challengeId)
    onlyContestOwner(contestId)
    onlyContestChallenge(contestId, challengeId)
    onlyContestInState(contestId, IContests.ContestState.FLAGCOMMIT) {
        challenges[challengeId].key = key;
    }

    function update(uint contestId, uint challengeId, IChallenge calldata challenge) external
    onlyChallengeExist(challengeId)
    onlyContestOwner(contestId)
    onlyContestChallenge(contestId, challengeId)
    onlyContestInState(contestId, IContests.ContestState.CREATE) {
        challenges[challengeId].info = challenge;
    }

    function remove(uint contestId, uint challengeId) external {
        _remove(contestId, challengeId);
    }

    function removes(uint contestId, uint [] memory challengeIds) external {
        for (uint i = 0; i < challengeIds.length; i++) {
            _remove(contestId, challengeIds[i]);
        }
    }

    function isContestChallenge(uint contestId, uint challengeId) view external returns (bool) {
        return contestChallenges[contestId].contains(challengeId);
    }

    function getContestChallengeIds(uint contestId) external view returns (uint [] memory){
        return contestChallenges[contestId].values();
    }

    function getChallenge(uint challengeId) external view returns (Challenge memory) {
        return challenges[challengeId];
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Challenge memory) {
        return challenges[ids.at(index)];
    }

    modifier onlyChallengeExist(uint challengeId){
        require(challenges[challengeId].id > 0, "challenge does not exist");
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
    modifier onlyContestChallenge(uint contestId, uint challengeId){
        require(contestChallenges[contestId].contains(challengeId), "only contest's challenge");
        _;
    }
}