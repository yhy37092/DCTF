const {expectRevert, time} = require('@openzeppelin/test-helpers');
const DCTF = artifacts.require('DCTF.sol');

contract('DCTF', (accounts) => {
    let contract;
    let now;
    let systemAdmin = accounts[0];
    let contestAdmin1 = accounts[1];
    let captain = accounts[2];
    let member1 = accounts[2];
    let member2 = accounts[3];
    let member3 = accounts[4];
    let non_user = accounts[5];
    let contestAdmin2 = accounts[6];
    let assertContest = (result, id, admin, name, fee, start, end, description, state) => {
        assert(web3.utils.toBN(result.id).toNumber() === id);
        assert(result.owner === admin);
        assert(result.name === name);
        assert(web3.utils.toBN(result.fee).toNumber() === fee);
        assert(web3.utils.toBN(result.start).eq(start));
        assert(web3.utils.toBN(result.end).eq(end));
        assert(result.description === description);
        assert(web3.utils.toBN(result.state).toNumber() === state);
    }
    let assertChallenge = (result, id, name, challengeType, category, description, connectionInfo, value, fileURL, hint) => {
        assert(result[0].toNumber() === id);
        assert(result[1] === name);
        assert(result[2].toNumber() === challengeType);
        assert(result[3] === category);
        assert(result[4] === description);
        assert(result[5] === connectionInfo);
        assert(result[6].toNumber() === value);
        assert(result[7] === fileURL);
        assert(result[8] === hint);
    }
    let assertTeam = (result, id, name, captain, members, state) => {
        assert(result[0].toNumber() === id);
        assert(result[1] === name);
        assert(result[2] === captain);
        members.forEach((value, index) => assert(result[3][index] === value));
        assert(result[4].toNumber() === state);
    }
    before(async () => {
        contract = await DCTF.new(systemAdmin);
        await contract.addContestAdmin(contestAdmin1, "contest admin one");
    });
    beforeEach(async () => {
        now = await time.latest();
    });
    // it('should NOT add contest admin if not system admin', async () => {
    //     expectRevert(
    //         contract.addContestAdmin(contestAdmin2, "contest admin two",{from:non_user}),
    //         'is missing role'
    //     )
    // });
    // it('should add contest admin', async () => {
    //     let role = web3.utils.soliditySha3('CONTEST_ADMIN_ROLE_ROLE');
    //     await contract.addContestAdmin(contestAdmin2, "contest admin two");
    //     assert(await contract.hasRole(role,contestAdmin2) === true);
    // });
    // it('should get contest admin', async () => {
    //     let result = await contract.getContestAdmin(1);
    //     assert(result[0] === contestAdmin2);
    //     assert(result[1] === "contest admin two");
    // });
    // it('should update contest admin', async () => {
    //     await contract.updateContestAdmin(contestAdmin2,"contest admin two modified");
    //     let result = await contract.getContestAdmin(1);
    //     assert(result[0] === contestAdmin2);
    //     assert(result[1] === "contest admin two modified");
    // });
    // it('should delete contest admin', async () => {
    //     let role = web3.utils.soliditySha3('CONTEST_ADMIN_ROLE_ROLE');
    //     await contract.deleteContestAdmin(contestAdmin2);
    //     assert(await contract.hasRole(role,contestAdmin2) === false);
    //     await contract.addContestAdmin(contestAdmin2, "contest admin two");
    // });
    // it('should NOT add contest if not contest admin', async () => {
    //     let start = now.add(time.duration.seconds(30));
    //     let end = now.add(time.duration.seconds(60));
    //     expectRevert(
    //         contract.addContest('contest one', 1000, start, end, 'contest one description', {from: non_user}),
    //         'is missing role'
    //     )
    // });
    it('should add contest and getcontests', async () => {
        let start = now.add(time.duration.seconds(30));
        let end = now.add(time.duration.seconds(60));
        await contract.addContest('contest one', 1000, start, end, 'contest one description', {from: contestAdmin1});
        await contract.addContest('contest one', 1000, start, end, 'contest one description', {from: contestAdmin1});
        let result;
        result = await contract.getContests();
        assertContest(result[0], 1, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
        assertContest(result[1], 2, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
        result = await contract.getContests(contestAdmin1);
        assertContest(result[0], 1, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
        assertContest(result[1], 2, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
        result = await contract.getContest(1);
        console.log(result);
        assertContest(result, 1, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
    });
    // it('should NOT update contest if not contest owner', async () => {
    //     let start = now.add(time.duration.seconds(30));
    //     let end = now.add(time.duration.seconds(60));
    //     expectRevert(
    //         contract.updateContest(1, 'contest one', 1000, start, end, 'contest one description', {from: contestAdmin2}),
    //         'only contest owner'
    //     )
    // });
    // it('should update contest and get contestIds', async () => {
    //     let start = now.add(time.duration.seconds(10));
    //     let end = now.add(time.duration.seconds(20));
    //     let contestIds = await contract.getContestIds({from: contestAdmin1});
    //     assert(contestIds[0].toNumber() === 1);
    //     await contract.updateContest(1, 'contest one', 1000, start, end, 'contest one description', {from: contestAdmin1});
    //     let result = await contract.getContest(0);
    //     assertContest(result, 1, contestAdmin1, 'contest one', 1000, start, end, 'contest one description', 0);
    // });
    // it('should delete contest', async () => {
    //     await contract.deleteContest(1, {from: contestAdmin1});
    //     let count = await contract.getContestCount();
    //     assert(count.toNumber() === 0);
    //     //refund
    // });
    // it('should NOT add challenge if contest does not exist', async () => {
    //     expectRevert(
    //         contract.addChallenge(1, 'challenge one', 0, 'challenge one category',
    //             'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint', {from: contestAdmin1}),
    //         'contest does not exist'
    //     );
    // });
    // it('should NOT add challenge if not contest owner', async () => {
    //     let start = now.add(time.duration.seconds(30));
    //     let end = now.add(time.duration.seconds(60));
    //     await contract.addContest('contest two', 1000, start, end, 'contest two description', {from: contestAdmin1});
    //     expectRevert(
    //         contract.addChallenge(2, 'challenge one', 0, 'challenge one category',
    //             'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint', {from: contestAdmin2}),
    //         'only contest owner'
    //     );
    // });
    // it('should add challenge and get', async () => {
    //     await contract.addChallenge(2, 'challenge one', 0, 'challenge one category',
    //         'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint', {from: contestAdmin1});
    //     let ids = await contract.getContestChallengeIds(2);
    //     assert(ids[0].toNumber() === 1);
    //     let result = await contract.getChallenge(1);
    //     assertChallenge(result, 1, 'challenge one', 0, 'challenge one category',
    //         'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    // });
    // it('should update challenge', async () => {
    //     await contract.updateChallenge(1, 'challenge one modified', 0, 'challenge one category modified',
    //         'challenge one description modified', 'challenge one connectionInfo modified', 100, 'challenge one fileURL modified', 'challenge one hint modified', {from: contestAdmin1});
    //     let result = await contract.getChallenge(1);
    //     assertChallenge(result, 1, 'challenge one modified', 0, 'challenge one category modified',
    //         'challenge one description modified', 'challenge one connectionInfo modified', 100, 'challenge one fileURL modified', 'challenge one hint modified');
    // });
    // it('should delete challenge', async () => {
    //     await contract.deleteChallenge(1, {from: contestAdmin1});
    //     let ids = await contract.getContestChallengeIds(2);
    //     assert(ids.length === 0);
    // });
    // it('should NOT apply contest if fee is not qualified', async () => {
    //     expectRevert(
    //         contract.applyContest(2, 'Team one', [member1, member2, member3], {from: non_user, value: 900}),
    //         'not qualified contest fee'
    //     );
    // });
    // it('should apply contest and get team', async () => {
    //     const gasPrise = web3.utils.toBN(
    //         await web3.eth.getGasPrice()
    //     );
    //     const balanceBefore = web3.utils.toBN(
    //         await web3.eth.getBalance(captain)
    //     );
    //     const balanceBeforeContract = web3.utils.toBN(
    //         await web3.eth.getBalance(contract.address)
    //     );
    //     let tx = await contract.applyContest(2, 'Team one', [member1, member2, member3], {from: captain, value: 1000});
    //     const balanceAfter = web3.utils.toBN(
    //         await web3.eth.getBalance(captain)
    //     );
    //     const balanceAfterContract = web3.utils.toBN(
    //         await web3.eth.getBalance(contract.address)
    //     );
    //     assert(
    //         balanceBefore
    //             .sub(balanceAfter)
    //             .sub(web3.utils.toBN(tx.receipt.gasUsed).mul(gasPrise)).toNumber() === 1000);
    //     assert(balanceAfterContract.sub(balanceBeforeContract).toNumber() === 1000)
    //     let ids = await contract.getContestTeamIds(2);
    //     assert(ids[0].toNumber() === 1);
    //     let result = await contract.getTeam(1);
    //     assertTeam(result, 1, 'Team one', captain, [member1, member2, member3], 0);
    // });
    // it('should NOT apply contest if contest begin', async () => {
    //     let start = now.add(time.duration.seconds(5));
    //     let end = now.add(time.duration.seconds(10));
    //     await contract.addContest('contest three', 1000, start, end, 'contest three description', {from: contestAdmin2});
    //     await time.increase(5001);
    //     expectRevert(
    //         contract.applyContest(3, 'Team two', [non_user, member2, member3], {from: non_user, value: 1000}),
    //         'now allowed contest state'
    //     )
    // });
    // it('should NOT audit contest team if not contest owner', async () => {
    //     let start = now.add(time.duration.seconds(30));
    //     let end = now.add(time.duration.seconds(60));
    //     await contract.addContest('contest four', 1000, start, end, 'contest four description', {from: contestAdmin2});
    //     await contract.applyContest(4, 'Team two', [non_user, member2, member3], {from: non_user, value: 1000});
    //     expectRevert(
    //         contract.auditApply(2, true, {from: non_user}),
    //         'only contest owner'
    //     )
    // });
    // it('should NOT audit contest team if contest begin', async () => {
    //     let start = now.add(time.duration.seconds(5));
    //     let end = now.add(time.duration.seconds(10));
    //     await contract.addContest('contest five', 1000, start, end, 'contest five description', {from: contestAdmin2});
    //     await contract.applyContest(5, 'Team three', [non_user, member2, member3], {from: non_user, value: 1000});
    //     await time.increase(5001);
    //     expectRevert(
    //         contract.auditApply(3, true, {from: contestAdmin2}),
    //         'now allowed contest state'
    //     )
    // });
    // it('should approve contest team', async () => {
    //     let start = now.add(time.duration.seconds(30));
    //     let end = now.add(time.duration.seconds(60));
    //     await contract.addContest('contest six', 1000, start, end, 'contest six description', {from: contestAdmin1});
    //     await contract.applyContest(6, 'Team four', [non_user, member2, member3], {from: non_user, value: 1000});
    //     await contract.auditApply(4, true, {from: contestAdmin1});
    //     let result = await contract.getTeam(4);
    //     assertTeam(result, 4, 'Team four', non_user, [non_user, member2, member3], 1);
    // });
    // it('should reject contest team', async () => {
    //     await contract.applyContest(6, 'Team five', [member1, member2, member3], {from: captain, value: 1000});
    //     const balanceBefore = web3.utils.toBN(
    //         await web3.eth.getBalance(captain)
    //     );
    //     await contract.auditApply(5, false, {from: contestAdmin1});
    //     const balanceAfter = web3.utils.toBN(
    //         await web3.eth.getBalance(captain)
    //     );
    //     assert(balanceAfter.sub(balanceBefore).toNumber() === 1000)
    //     let result = await contract.getTeam(5);
    //     assertTeam(result, 5, 'Team five', captain, [member1, member2, member3], 2);
    // });
});