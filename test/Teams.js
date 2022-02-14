// const { expectRevert} = require('@openzeppelin/test-helpers');
// const Teams = artifacts.require('Teams.sol');
//
// contract('Teams', (accounts) => {
//     let contract;
//     let assertTeam = (result,id,name, captain, members,state) => {
//         assert(result[0].toNumber() === id);
//         assert(result[1] === name);
//         assert(result[2] === captain);
//         members.forEach((value,index)=>assert(result[3][index] === value));
//         assert(result[4].toNumber() === state);
//     }
//     before(async () => {
//         contract = await Teams.new();
//     });
//
//     it("Should add and get team", async () => {
//         await contract.add('team one', accounts[0],[accounts[0],accounts[1],accounts[2]] );
//         let result = await contract.get(0);
//         assertTeam(result, 1,'team one', accounts[0],[accounts[0],accounts[1],accounts[2]],0);
//     });
//     it("Should getTeam, contains and getCount", async () => {
//         await contract.add('team one', accounts[0],[accounts[0],accounts[1],accounts[2]] );
//         let count = await contract.getCount();
//         assert(count.toNumber() === 2);
//         assert(await contract.contains(2) === true);
//         let result = await contract.getTeam(2);
//         assertTeam(result, 2,'team one', accounts[0],[accounts[0],accounts[1],accounts[2]],0);
//     });
//     it('Should NOT update a non-existing state', async () => {
//         await contract.add('team three', accounts[0],[accounts[0],accounts[1],accounts[2]] );
//         await expectRevert(
//             contract.updateState(3,10),
//             'not qualified state'
//         );
//     });
//     it('Should update state', async () => {
//         await contract.updateState(3,1);
//         let result = await contract.getTeam(3);
//         assertTeam(result, 3,'team three', accounts[0],[accounts[0],accounts[1],accounts[2]],1);
//     });
//     it('Should not update state', async () => {
//         await expectRevert(
//             contract.updateState(3,2),
//             'now allowed team state'
//         );
//     });
//     it('Should NOT update a non-existing Team', async () => {
//         await expectRevert(
//             contract.update(4,'team four', accounts[0],[accounts[0],accounts[1],accounts[2]]),
//             'team does not exist'
//         );
//     });
//     it('Should NOT update a non-approved Team', async () => {
//         await contract.add('team four', accounts[0],[accounts[0],accounts[1],accounts[2]] );
//         await expectRevert(
//             contract.update(4,'team two', accounts[0],[accounts[0],accounts[1],accounts[2]]),
//             'now allowed team state'
//         );
//     });
//     it('Should update an existing approved team', async () => {
//         await contract.updateState(4,1);
//         await contract.update(4,'team four', accounts[1],[accounts[1],accounts[2],accounts[3]] );
//         let result = await contract.getTeam(4);
//         assertTeam(result, 4,'team four', accounts[1],[accounts[1],accounts[2],accounts[3]],1);
//     });
//     it('Should NOT remove a non-existing team', async () => {
//         await expectRevert(
//             contract.remove(5),
//             'team does not exist'
//         );
//     });
//     it('Should NOT remove a non-rejected team', async () => {
//         await contract.add('team five', accounts[0],[accounts[0],accounts[1],accounts[2]] );
//         await expectRevert(
//             contract.remove(1),
//             'now allowed team state'
//         );
//     });
//     it('Should remove an existing rejected team', async () => {
//         await contract.updateState(5,2);
//         assert(await contract.contains(5) === true)
//         await contract.remove(5);
//         assert(await contract.contains(5) === false)
//     });
// });