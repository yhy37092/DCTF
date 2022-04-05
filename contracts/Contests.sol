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

    function _updateState(uint id) internal {
        IContests.Contest storage contest = contests[id];
        if (block.timestamp >= contest.info.end + contest.info.revealTime) {contests[id].state = IContests.ContestState.END; return;}
        if (block.timestamp >= contest.info.end) {contests[id].state = IContests.ContestState.REVEAL; return;}
        if (block.timestamp >= contest.info.start + contest.info.flagCommitTime) {contest.state = IContests.ContestState.SUBMITCOMMIT; return;}
        if (block.timestamp >= contest.info.start) {contest.state = IContests.ContestState.FLAGCOMMIT; return;}
    }

    function _remove(uint id) internal
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATE) {
        ids.remove(id);
        addressToContests[msg.sender].remove(id);
        delete contests[id];
    }

    function add(IContest calldata contest) external
    onlyContestAdmin()
    timeQualified(contest) {
        ids.add(nextId);
        addressToContests[msg.sender].add(nextId);
        contests[nextId] = Contest(nextId, contest, msg.sender, ContestState.CREATE, block.timestamp);
        nextId++;
    }

    function update(uint id, IContest calldata contest) external
    onlyContestExist(id)
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATE)
    timeQualified(contest) {
        contests[id].info = contest;
    }

    function remove(uint id) external {
        _remove(id);
    }

    function removes(uint [] memory _ids) external {
        for (uint i = 0; i < _ids.length; i++) {
            _remove(_ids[i]);
        }
    }

    function contestInState(uint id, IContests.ContestState state) external returns (bool) {
        _updateState(id);
        return contests[id].state == state;
    }

    function getContest(uint id) external view returns (Contest memory) {
        return contests[id];
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

    modifier onlyContestExist(uint id){
        require(ids.contains(id), "contest does not exist");
        _;
    }

    modifier onlyContestAdmin() {
        require(AccessControl.hasRole(keccak256("CONTEST_ADMIN"), msg.sender), "only contest admin");
        _;
    }

    modifier onlyContestOwner(uint id){
        require(contests[id].owner == msg.sender, "only contest owner");
        _;
    }

    modifier onlyContestInState(uint id, IContests.ContestState state){
        _updateState(id);
        require(contests[id].state == state, "wrong contest state");
        _;
    }

    modifier timeQualified(IContest calldata contest){
        require(contest.start > block.timestamp, "can only add contest at a future date");
        require(contest.end > contest.start, "can only add contest if end after start");
        require(contest.flagCommitTime < contest.end - contest.start, "flag commit time duration wrong");
        _;
    }
}