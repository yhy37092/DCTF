// const {expectRevert, time} = require('@openzeppelin/test-helpers');
// const Contests = artifacts.require('Contests.sol');
//
// contract('Contests', (accounts) => {
//     let contract;
//     let now;
//     let assertContest = (result, id, admin, name, fee, start, end, description, state) => {
//         assert(result[0].toNumber() === id);
//         assert(result[1] === admin);
//         assert(result[2] === name);
//         assert(result[3].toNumber() === fee);
//         assert(result[4].eq(start));
//         assert(result[5].eq(end));
//         assert(result[6] === description);
//         assert(result[7].toNumber() === state);
//     }
//     before(async () => {
//         contract = await Contests.new();
//     });
//     beforeEach(async () => {
//         now = await time.latest();
//     });
//     it('Should NOT add an contest if start after end', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(20));
//         await expectRevert(
//             contract.add('contest one', accounts[0], 1000, start, end, 'contest one description'),
//             'can only add contest if end after start'
//         );
//     });
//     it('Should NOT add an contest if start before now', async () => {
//         let start = now.sub(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(20));
//         await expectRevert(
//             contract.add('contest one', accounts[0], 1000, start, end, 'contest one description'),
//             'can only add contest at a future date'
//         );
//     });
//     it("Should add and get contest", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         await contract.add('contest one', accounts[0], 1000, start, end, 'contest one description');
//         let result = await contract.get(0);
//         assertContest(result, 1, accounts[0], 'contest one', 1000, start, end, 'contest one description', 0);
//     });
//     it("Should getContest, contains and getCount", async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         await contract.add('contest one', accounts[0], 1000, start, end, 'contest one description');
//         let result = await contract.getContest(2);
//         let count = await contract.getCount();
//         assert(await contract.contains(2) === true);
//         assertContest(result, 2, accounts[0], 'contest one', 1000, start, end, 'contest one description', 0);
//         assert(count.toNumber() === 2);
//     });
//     it('Should update an existing contest', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         await contract.update(2, 'contest two', accounts[0], 1001, start, end, 'contest two description');
//         let result = await contract.getContest(2);
//         assertContest(result, 2, accounts[0], 'contest two', 1001, start, end, 'contest two description', 0);
//     });
//     it('Should NOT update a non-existing contest', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         await expectRevert(
//             contract.update(3, 'contest three', accounts[0], 1000, start, end, 'contest three description'),
//             'contest does not exist'
//         );
//     });
//     it('Should NOT update a begin or end contest', async () => {
//         let start = now.add(time.duration.seconds(5));
//         let end = now.add(time.duration.seconds(10));
//         await contract.add('contest three', accounts[0], 1000, start, end, "contest three description");
//         await time.increase(5001);
//         start = start.add(time.duration.seconds(30));
//         end = end.add(time.duration.seconds(30));
//         await expectRevert(
//             contract.update(3, 'contest three', accounts[0], 1000, start, end, "contest three description"),
//             'now allowed after contest begin'
//         );
//     });
//     it('Should remove a contest', async () => {
//         let start = now.add(time.duration.seconds(30));
//         let end = now.add(time.duration.seconds(60));
//         await contract.add('contest four', accounts[0], 1000, start, end, "contest four description");
//         assert(await contract.contains(4) === true);
//         await contract.remove(4);
//         assert(await contract.contains(4) === false);
//     });
// });
