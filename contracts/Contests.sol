// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IContests.sol";

contract Contests is IContests {

    using EnumerableSet for EnumerableSet.UintSet;

    IAccessControl AccessControl;

    constructor(address _AccessControl) {
        AccessControl = IAccessControl(_AccessControl);
    }

    EnumerableSet.UintSet ids;
    mapping(uint => Contest) contests;
    uint public nextId = 1;

    mapping(address => EnumerableSet.UintSet) addressToContests;

    function _updateState(uint contestId) internal {
        IContests.Contest storage contest = contests[contestId];
        if (block.timestamp >= contest.info.end + contest.info.revealTime) {contests[contestId].state = IContests.ContestState.END; return;}
        if (block.timestamp >= contest.info.end) {contests[contestId].state = IContests.ContestState.REVEAL; return;}
        if (block.timestamp >= contest.info.start + contest.info.flagCommitTime) {contest.state = IContests.ContestState.SUBMITCOMMIT; return;}
        if (block.timestamp >= contest.info.start) {contest.state = IContests.ContestState.FLAGCOMMIT; return;}
    }

    function _remove(uint contestId) internal
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE) {
        ids.remove(contestId);
        addressToContests[msg.sender].remove(contestId);
        delete contests[contestId];
    }

    function add(IContest calldata contest) external
    onlyContestAdmin()
    timeQualified(contest) {
        ids.add(nextId);
        addressToContests[msg.sender].add(nextId);
        contests[nextId] = Contest(nextId, contest, msg.sender, ContestState.CREATE, block.timestamp);
        nextId++;
    }

    function update(uint contestId, IContest calldata contest) external
    onlyContestExist(contestId)
    onlyContestOwner(contestId)
    onlyContestInState(contestId, IContests.ContestState.CREATE)
    timeQualified(contest) {
        contests[contestId].info = contest;
    }

    function remove(uint contestId) external {
        _remove(contestId);
    }

    function removes(uint [] memory contestIds) external {
        for (uint i = 0; i < contestIds.length; i++) {
            _remove(contestIds[i]);
        }
    }

    function contestInState(uint contestId, IContests.ContestState state) external returns (bool) {
        _updateState(contestId);
        return contests[contestId].state == state;
    }

    function getContest(uint contestId) external view returns (Contest memory) {
        return contests[contestId];
    }

    function getMyContestIds() external view returns (uint [] memory){
        return addressToContests[msg.sender].values();
    }

    function getCount() external view returns (uint) {
        return ids.length();
    }

    function get(uint index) external view returns (Contest memory) {
        return contests[ids.at(index)];
    }

    modifier onlyContestExist(uint contestId){
        require(ids.contains(contestId), "contest does not exist");
        _;
    }

    modifier onlyContestAdmin() {
        require(AccessControl.hasRole(keccak256("CONTEST_ADMIN"), msg.sender), "only contest admin");
        _;
    }

    modifier onlyContestOwner(uint contestId){
        require(contests[contestId].owner == msg.sender, "only contest owner");
        _;
    }

    modifier onlyContestInState(uint contestId, IContests.ContestState state){
        _updateState(contestId);
        require(contests[contestId].state == state, "wrong contest state");
        _;
    }

    modifier timeQualified(IContest calldata contest){
        require(contest.start > block.timestamp, "can only add contest at a future date");
        require(contest.end > contest.start, "can only add contest if end after start");
        require(contest.flagCommitTime < contest.end - contest.start, "flag commit time duration wrong");
        _;
    }
}