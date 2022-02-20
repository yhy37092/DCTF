// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract AccessContr0l is AccessControlEnumerable {

    bytes32 public constant SYSTEM_ADMIN = keccak256("SYSTEM_ADMIN");
    bytes32 public constant CONTEST_ADMIN = keccak256("CONTEST_ADMIN");

    constructor(address systemAdmin) {
        _setRoleAdmin(CONTEST_ADMIN, SYSTEM_ADMIN);
        _setupRole(SYSTEM_ADMIN, systemAdmin);
    }

    function getRoleMembers(bytes32 role) external view returns(address [] memory) {
        uint number = getRoleMemberCount(role);
        address [] memory accounts = new address [] (number);
        for(uint i = 0; i < number; i++) {
            address account = getRoleMember(role, i);
            accounts[i] = account;
        }
        return accounts;
    }

    function grantRoles(bytes32 role, address [] memory accounts) external {
        for(uint i = 0; i < accounts.length; i++) {
            grantRole(role, accounts[i]);
        }
    }
    function revokeRoles(bytes32 role, address [] memory accounts) external {
        for(uint i = 0; i < accounts.length; i++) {
            revokeRole(role, accounts[i]);
        }
    }

}