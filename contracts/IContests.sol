// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

interface IContests {

    struct IContest {
        string contestType;
        string name;
        uint fee;
        uint start;
        uint end;
        string message;
    }

    struct Contest {
        uint id;
        IContest contestInfo;
        address owner;
        ContestState state;
        uint timeStamp;
    }

    enum ContestState{
        DEFAULT,
        CREATED,
        STARTED,
        ENDED
    }

    function add(IContest calldata contest) external;

    function update(uint id, IContest calldata contest) external;

    function remove(uint id) external;

    function isOwner(uint contestId, address account) external view returns(bool);

    function Exist(uint contestId) external view returns(bool);

    function getSome(uint [] memory _ids) external view returns (Contest [] memory);

    function getAll() external view returns (Contest [] memory);

    function gets(address account) external view returns (Contest [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Contest memory);
}