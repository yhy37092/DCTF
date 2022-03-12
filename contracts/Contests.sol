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
        if (block.timestamp >= contests[id].info.start) contests[id].state = IContests.ContestState.STARTED;
        if (block.timestamp >= contests[id].info.commitEnd) contests[id].state = IContests.ContestState.COMMITENDED;
        if (block.timestamp >= contests[id].info.revealEnd) contests[id].state = IContests.ContestState.REVEALENDED;
    }

    function _remove(uint id) internal
    onlyContestExist(id)
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATED) {
        ids.remove(id);
        addressToContests[msg.sender].remove(id);
        delete contests[id];
    }

    function add(IContest calldata contest) external
    onlyContestAdmin()
    timeQualified(contest) {
        ids.add(nextId);
        addressToContests[msg.sender].add(nextId);
        contests[nextId] = Contest(nextId, contest, msg.sender, ContestState.CREATED, block.timestamp);
        nextId++;
    }

    function update(uint id, IContest calldata contest) external
    onlyContestExist(id)
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATED)
    timeQualified(contest) {
        contests[id].info = contest;
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
        require(contest.commitEnd > contest.start, "can only add contest if commit end after start");
        require(contest.revealEnd > contest.commitEnd, "can only add contest if reveal end after commit end");
        _;
    }
}