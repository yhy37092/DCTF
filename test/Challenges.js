// const { expectRevert} = require('@openzeppelin/test-helpers');
// const Challenges = artifacts.require('Challenges.sol');
//
// contract('Challenges', () => {
//     let contract;
//     let assertChallenge = (result,id,name, challengeType, category, description, connectionInfo, value, fileURL, hint) => {
//         assert(result[0].toNumber() === id);
//         assert(result[1] === name);
//         assert(result[2].toNumber() === challengeType);
//         assert(result[3] === category);
//         assert(result[4] === description);
//         assert(result[5] === connectionInfo);
//         assert(result[6].toNumber() === value);
//         assert(result[7] === fileURL);
//         assert(result[8] === hint);
//     }
//     before(async () => {
//         contract = await Challenges.new();
//     });
//
//     it("Should add and get challenge", async () => {
//         await contract.add('challenge one', 0, 'challenge one category', 'challenge one description','challenge one connectionInfo',100, 'challenge one fileURL','challenge one hint' );
//         let result = await contract.get(0);
//         assertChallenge(result, 1,'challenge one', 0, 'challenge one category', 'challenge one description','challenge one connectionInfo',100, 'challenge one fileURL','challenge one hint');
//     });
//     it("Should getChallenge, contains and getCount", async () => {
//         await contract.add('challenge one', 0, 'challenge one category', 'challenge one description','challenge one connectionInfo',100, 'challenge one fileURL','challenge one hint' );
//         let count = await contract.getCount();
//         assert(count.toNumber() === 2);
//         assert(await contract.contains(2) === true);
//         let result = await contract.getChallenge(2);
//         assertChallenge(result, 2,'challenge one', 0, 'challenge one category', 'challenge one description','challenge one connectionInfo',100, 'challenge one fileURL','challenge one hint');
//     });
//     it('Should NOT update a non-existing challenge', async () => {
//         await expectRevert(
//             contract.update(3,'challenge three', 0, 'challenge three category', 'challenge three description','challenge three connectionInfo',100, 'challenge three fileURL','challenge three hint' ),
//             'challenge does not exist'
//         );
//     });
//     it('Should update an existing contest', async () => {
//         await contract.update(2,'challenge two', 0, 'challenge two category', 'challenge two description','challenge two connectionInfo',100, 'challenge two fileURL','challenge two hint' );
//         let result = await contract.getChallenge(2);
//         assertChallenge(result, 2, 'challenge two', 0, 'challenge two category', 'challenge two description','challenge two connectionInfo',100, 'challenge two fileURL','challenge two hint');
//     });
//     it('Should NOT remove a non-existing challenge', async () => {
//         await expectRevert(
//             contract.remove(3),
//             'challenge does not exist'
//         );
//     });
//     it('Should remove an existing challenge', async () => {
//         assert(await contract.contains(2) === true)
//         await contract.remove(2);
//         assert(await contract.contains(2) === false)
//     });
// });