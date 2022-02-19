// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IContests.sol";

contract Contests is IContests {

    using EnumerableSet for EnumerableSet.UintSet;

    IAccessControl AccessControl;

    constructor(address _AccessControl) {
        AccessControl = IAccessControl(_AccessControl);
    }

    EnumerableSet.UintSet ids;
    //ContestId => contest
    mapping(uint => Contest) public contests;
    uint public nextId = 1;

    // index
    // contests managed by someone
    mapping(address => EnumerableSet.UintSet) addressToContests;

    function _gets(uint [] memory _ids) internal view returns (Contest [] memory) {
        uint number = _ids.length;
        Contest [] memory result = new Contest [] (number);
        for(uint i = 0; i < number; i++) {
            result[i] = contests[_ids[i]];
        }
        return result;
    }

    function _updateState(uint id) internal {
        if(block.timestamp >= contests[id].contestInfo.start) contests[id].state = IContests.ContestState.STARTED;
        if(block.timestamp >= contests[id].contestInfo.end) contests[id].state = IContests.ContestState.ENDED;
    }

    function add(IContest calldata contest) external
    onlyContestAdmin()
    timeQualified(contest.start, contest.end) {
        ids.add(nextId);
        addressToContests[msg.sender].add(nextId);
        contests[nextId] = Contest(nextId, contest, msg.sender, ContestState.CREATED, block.timestamp);
        nextId++;
    }

    function update(uint id, IContest calldata contest) external
    onlyContestExist(id)
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATED)
    timeQualified(contest.start, contest.end) {
        contests[id].contestInfo = contest;
    }

    function remove(uint id) external
    onlyContestExist(id)
    onlyContestOwner(id)
    onlyContestInState(id, IContests.ContestState.CREATED) {
        ids.remove(id);
        addressToContests[msg.sender].remove(id);
        delete contests[id];
    }

    function contestInState(uint id, IContests.ContestState state) external returns(bool) {
        _updateState(id);
        return contests[id].state == state;
    }

    function isOwner(uint contestId, address account) external view returns(bool) {
        return contests[contestId].owner == account;
    }

    function Exist(uint contestId) external view returns(bool) {
        return contests[contestId].id > 0;
    }

    function getSome(uint [] memory _ids) external view returns (Contest [] memory) {
        return _gets(_ids);
    }

    function getAll() external view returns (Contest [] memory) {
        return _gets(ids.values());
    }

    function gets(address account) external view returns (Contest [] memory){
        return _gets(addressToContests[account].values());
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

    modifier timeQualified(uint start, uint end){
        require(end > start, "can only add contest if end after start");
        require(start > block.timestamp, "can only add contest at a future date");
        _;
    }
}