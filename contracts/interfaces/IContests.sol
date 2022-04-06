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

    function add(IContest calldata) external;

    function update(uint, IContest calldata) external;

    function remove(uint) external;

    function removes(uint [] memory) external;

    function contestInState(uint, IContests.ContestState) external returns (bool);

    function getContest(uint) external view returns (Contest memory);

    function getMyContestIds() external view returns (uint [] memory);

    function getCount() external view returns (uint);

    function get(uint) external view returns (Contest memory);
}