// const {expectRevert, time} = require('@openzeppelin/test-helpers');
// const {web3} = require("@openzeppelin/test-helpers/src/setup");
// const assert = require("assert");
// const AccessContr0l = artifacts.require('AccessContr0l.sol');
// const Contests = artifacts.require('Contests.sol');
//
// contract('Contests', (accounts) => {
//     let contract;
//     let now;
//     let systemAdmin = accounts[1];
//     let contestAdmin = accounts[2];
//     let CONTEST_ADMIN = web3.utils.soliditySha3("CONTEST_ADMIN");
//
//     let assertContest = (result, contest) => {
//         assert(parseInt(result.id) === contest.id);
//         assert(result.owner === contest.owner);
//         assert(result.contestInfo.contestType === contest.contestInfo.contestType);
//         assert(result.contestInfo.name === contest.contestInfo.name);
//         assert(parseInt(result.contestInfo.fee) === contest.contestInfo.fee);
//         assert(web3.utils.toBN(result.contestInfo.start).eq(contest.contestInfo.start));
//         assert(web3.utils.toBN(result.contestInfo.end).eq(contest.contestInfo.end));
//         assert(result.contestInfo.message === contest.contestInfo.message);
//         assert(parseInt(result.state) === contest.state);
//     }
//     beforeEach(async () => {
//         let accessContr0l = await AccessContr0l.new(systemAdmin);
//         await accessContr0l.grantRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
//         contract = await Contests.new(accessContr0l.address);
//         now = await time.latest();
//     });
//
//     it('Should NOT add an contest if start after end', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(20));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         }
//         await expectRevert(contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin}), 'can only add contest if end after start');
//     });
//     it('Should NOT add an contest if start before now', async () => {
//         let start = now.sub(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(30));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         }
//         await expectRevert(contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin}), 'can only add contest at a future date');
//     });
//     it("Should NOT add contest if not contest admin", async () => {
//         let start = now.sub(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(30));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         }
//         await expectRevert(contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: accounts[5]}), 'only contest admin');
//     });
//     it("Should add contest", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         let result = await contract.contests(1);
//         assertContest(result, contest);
//     });
//     it("Should owner, exist", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         let result = await contract.isOwner(1, contestAdmin);
//         assert(result === true);
//         result = await contract.Exist(1);
//         assert(result === true);
//     });
//     it("Should contest in state", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         let result = await contract.contestInState(1, '1');
//         assert(result === true);
//     });
//
//     it("Should getSome, getAll, gets, getCount, get", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//
//         let result = await contract.getSome([1]);
//         assertContest(result[0], contest);
//
//         result = await contract.getAll();
//         assertContest(result[0], contest);
//         contest.id = 2;
//         assertContest(result[1], contest);
//
//         result = await contract.gets(contestAdmin);
//         contest.id = 1;
//         assertContest(result[0], contest);
//         contest.id = 2;
//         assertContest(result[1], contest);
//
//         result = await contract.getCount();
//         assert(result.toNumber() === 2);
//
//         result = await contract.get(1);
//         assertContest(result, contest);
//
//     });
//     it('Should NOT update a non-existing contest', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await expectRevert(contract.update(1, [contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin}), 'contest does not exist');
//     });
//     it('Should NOT update a contest if not contest owner', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         await expectRevert(contract.update(1, [contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: accounts[5]}), 'only contest owner');
//     });
//     it('Should NOT update a begin or end contest', async () => {
//         let start = now.add(time.duration.seconds(5));
//         let end = now.add(time.duration.seconds(10));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         await time.increase(5001);
//         start = now.add(time.duration.seconds(30));
//         end = now.add(time.duration.seconds(60));
//         await expectRevert(contract.update(1, [contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, start, end, contest.contestInfo.message], {from: contestAdmin}), 'wrong contest state');
//     });
//     it('Should update a contest', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         contest.contestInfo.fee = 10000;
//         await contract.update(1, [contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin})
//         let result = await contract.contests(1);
//         assertContest(result, contest);
//     });
//     it('Should remove a contest', async () => {
//         let start = now.add(time.duration.seconds(5));
//         let end = now.add(time.duration.seconds(10));
//         let contest = {
//             id: 1, owner: contestAdmin, contestInfo: {
//                 contestType: 'Jeopardy',
//                 name: 'WeCTF 2022',
//                 fee: 1000,
//                 start: start,
//                 end: end,
//                 message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
//             }, state: 1
//         };
//         await contract.add([contest.contestInfo.contestType, contest.contestInfo.name, contest.contestInfo.fee, contest.contestInfo.start, contest.contestInfo.end, contest.contestInfo.message], {from: contestAdmin});
//         await contract.remove(1, {from: contestAdmin});
//         let result = await contract.Exist(1);
//         assert(result === false);
//     });
// });
