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
        uint flagCommitTime;
        uint revealTime;
        string message;
    }

    struct Contest {
        uint id;
        IContest info;
        address owner;
        ContestState state;
        uint timeStamp;
    }

    enum ContestState{
        DEFAULT,
        CREATE,
        FLAGCOMMIT,
        SUBMITCOMMIT,
        REVEAL,
        END
    }

    function add(IContest calldata contest) external;

    function update(uint id, IContest calldata contest) external;

    function remove(uint id) external;

    function removes(uint [] memory _ids) external;

    function contestInState(uint id, IContests.ContestState state) external returns (bool);

    function getContest(uint id) external view returns (Contest memory);

    function getMyContestIds() external view returns (uint [] memory);

    function getCount() external view returns (uint);

    function get(uint index) external view returns (Contest memory);
}