// const {expectRevert} = require('@openzeppelin/test-helpers');
// const {web3} = require("@openzeppelin/test-helpers/src/setup");
// const AccessContr0l = artifacts.require('AccessContr0l.sol');
//
// contract('AccessContr0l', (accounts) => {
//
//     let contract;
//     let systemAdmin = accounts[1];
//     let contestAdmin = accounts[2];
//     let SYSTEM_ADMIN = web3.utils.soliditySha3("SYSTEM_ADMIN");
//     let CONTEST_ADMIN = web3.utils.soliditySha3("CONTEST_ADMIN");
//
//     beforeEach(async () => {
//         contract = await AccessContr0l.new(systemAdmin);
//     });
//
//     it('Should deploy with system admin', async () => {
//         let result = await contract.hasRole(SYSTEM_ADMIN, systemAdmin);
//         assert(result === true);
//         let roleAdmin = await contract.getRoleAdmin(CONTEST_ADMIN);
//         assert(roleAdmin === SYSTEM_ADMIN);
//     });
//
//     it('Should not grant contest admin if not system admin', async () => {
//         await expectRevert(contract.grantRole(CONTEST_ADMIN, contestAdmin, {from: accounts[5]}), 'is missing role');
//     });
//
//     it('Should grant contest admin', async () => {
//         await contract.grantRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
//         let result = await contract.hasRole(CONTEST_ADMIN, contestAdmin);
//         assert(result === true);
//     });
//
//     it('Should not revoke contest admin if not system admin', async () => {
//         await contract.grantRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
//         await expectRevert(contract.revokeRole(CONTEST_ADMIN, contestAdmin, {from: accounts[5]}), 'is missing role');
//     });
//
//     it('Should revoke contest admin', async () => {
//         await contract.grantRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
//         await contract.revokeRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
//         let result = await contract.hasRole(CONTEST_ADMIN, contestAdmin);
//         assert(result === false);
//     });
//
//     it('Should get role members', async () => {
//         await Promise.all(accounts.map(account => contract.grantRole(CONTEST_ADMIN, account, {from: systemAdmin})));
//         let count = await contract.getRoleMemberCount(CONTEST_ADMIN);
//         let result = await Promise.all([...Array(count.toNumber()).keys()].map(index => contract.getRoleMember(CONTEST_ADMIN, index)));
//         assert(count.toNumber() === 10)
//         result.forEach(member => assert(accounts.includes(member)))
//     });
//
// });
