// const {expectRevert} = require('@openzeppelin/test-helpers');
// const Moves = artifacts.require('Moves.sol');
//
// contract('Moves', (accounts) => {
//     let contract;
//     let flag;
//     let salt;
//     let assertMove = (result, id, hash, flag, salt, state) => {
//         assert(result[0].toNumber() === id);
//         assert(result[1] === hash);
//         assert(result[2] === flag);
//         assert(result[3] === salt);
//         assert(result[4].toNumber() === state);
//     }
//     before(async () => {
//         contract = await Moves.new();
//         flag = 'flag';
//         salt = 'salt';
//     });
//     it("Should commit and get", async () => {
//         let hash = web3.utils.soliditySha3(flag,salt);
//         await contract.commit(flag, salt);
//         let result = await contract.get(0);
//         assertMove(result,1,hash,'','',0);
//     });
//     it("Should getMove,getCount and contains", async () => {
//         let hash = web3.utils.soliditySha3(flag,salt);
//         await contract.commit(flag, salt);
//         let count = await contract.getCount();
//         assert(count.toNumber() === 2);
//         assert(await contract.contains(2) === true);
//         let result = await contract.getMove(2);
//         assertMove(result,2,hash,'','',0);
//     });
//     it("Should NOT reveal move if move does not exist", async () => {
//         await expectRevert(
//             contract.reveal(3,flag,salt),
//             'move does not exist'
//         );
//     });
//     it("Should NOT reveal if does not match commit", async () => {
//         await expectRevert(
//             contract.reveal(2,'wrong flag','wrong salt'),
//             'reveal does not match commit'
//         );
//     });
//     it("Should reveal ", async () => {
//         let hash = web3.utils.soliditySha3(flag,salt);
//         await contract.reveal(2,flag,salt);
//         let result = await contract.getMove(2);
//         assertMove(result,2,hash,flag,salt,1);
//     });
//     it("Should NOT reveal if already revert", async () => {
//         await expectRevert(
//             contract.reveal(2,flag,salt),
//             'move already reveal'
//         );
//     });
// });