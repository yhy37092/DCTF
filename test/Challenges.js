const {expectRevert, time} = require('@openzeppelin/test-helpers');
const {web3} = require("@openzeppelin/test-helpers/src/setup");
const assert = require("assert");
const AccessContr0l = artifacts.require('AccessContr0l.sol');
const Contests = artifacts.require('Contests.sol');
const Challenges = artifacts.require('Challenges.sol');

contract('Challenges', (accounts) => {

    let contract;
    let systemAdmin = accounts[1];
    let contestAdmin = accounts[2];
    let CONTEST_ADMIN = web3.utils.soliditySha3("CONTEST_ADMIN");
    let challenge = {
        id: 1, contestId: 1, challengeInfo: {
            challengeType: 'WEB',
            name: '龙飞凤舞',
            category: 'WEB',
            message: 'WEB题。请下载lffw.txt。',
            file: 'https://ctf.pediy.com/itembank-xiti_attach_download-116.htm',
            connectionInfo: '',
            hint: '',
            value: 100
        }
    }
    let IChallenge = [challenge.challengeInfo.challengeType, challenge.challengeInfo.name, challenge.challengeInfo.category, challenge.challengeInfo.message, challenge.challengeInfo.connectionInfo, challenge.challengeInfo.file, challenge.challengeInfo.hint, challenge.challengeInfo.value];

    let assertChallenge = (result, challenge) => {
        assert(parseInt(result.id) === challenge.id);
        assert(parseInt(result.contestId) === challenge.contestId);
        assert(result.challengeInfo.challengeType === challenge.challengeInfo.challengeType);
        assert(result.challengeInfo.name === challenge.challengeInfo.name);
        assert(result.challengeInfo.category === challenge.challengeInfo.category);
        assert(result.challengeInfo.message === challenge.challengeInfo.message);
        assert(result.challengeInfo.connectionInfo === challenge.challengeInfo.connectionInfo);
        assert(result.challengeInfo.file === challenge.challengeInfo.file);
        assert(result.challengeInfo.hint === challenge.challengeInfo.hint);
        assert(parseInt(result.challengeInfo.value) === challenge.challengeInfo.value);
    }
    beforeEach(async () => {
        let accessContr0l = await AccessContr0l.new(systemAdmin);
        await accessContr0l.grantRole(CONTEST_ADMIN, contestAdmin, {from: systemAdmin});
        let contest = await Contests.new(accessContr0l.address);
        contract = await Challenges.new(contest.address);
        let now = await time.latest();
        console.log(new Date(now.toNumber() * 1000));
        let start = now.add(time.duration.seconds(30));
        let end = now.add(time.duration.seconds(60));
        let contestData = {
            id: 1, owner: contestAdmin, contestInfo: {
                contestType: 'Jeopardy',
                name: 'WeCTF 2022',
                fee: 1000,
                start: start,
                end: end,
                message: 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'
            }, state: 1
        };
        await contest.add([contestData.contestInfo.contestType, contestData.contestInfo.name, contestData.contestInfo.fee, contestData.contestInfo.start, contestData.contestInfo.end, contestData.contestInfo.message], {from: contestAdmin});
        start = now.add(time.duration.seconds(5));
        end = now.add(time.duration.seconds(60));
        await contest.add([contestData.contestInfo.contestType, contestData.contestInfo.name, contestData.contestInfo.fee, start, end, contestData.contestInfo.message], {from: contestAdmin});
    });
    it("Should NOT add challenge if not contest owner", async () => {
        await time.increase(5001);
        await expectRevert(contract.add(2, IChallenge, {from: accounts[5]}), 'only contest owner');
    });
    it("Should NOT add challenge if contest does not begin", async () => {
        await expectRevert(contract.add(1, IChallenge, {from: contestAdmin}), 'wrong contest state');
    });
    it("Should add challenge", async () => {
        await time.increase(10001);
        await contract.add(2, IChallenge, {from: contestAdmin});
        let result = await contract.challenges(1);
        assertChallenge(result, challenge);
    });

    // it('Should NOT update a non-existing challenge', async () => {
    //     await expectRevert(contract.update(3, 'challenge three', 0, 'challenge three category', 'challenge three description', 'challenge three connectionInfo', 100, 'challenge three fileURL', 'challenge three hint'), 'challenge does not exist');
    // });
    // it("Should update challenge", async () => {
    //     await contract.add('challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    //     let result = await contract.get(0);
    //     assertChallenge(result, 1, 'challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    // });
    // it("Should remove challenge", async () => {
    //     await contract.add('challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    //     let result = await contract.get(0);
    //     assertChallenge(result, 1, 'challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    // });
    // it("Should getChallenge, contains and getCount", async () => {
    //     await contract.add('challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    //     let count = await contract.getCount();
    //     assert(count.toNumber() === 2);
    //     assert(await contract.contains(2) === true);
    //     let result = await contract.getChallenge(2);
    //     assertChallenge(result, 2, 'challenge one', 0, 'challenge one category', 'challenge one description', 'challenge one connectionInfo', 100, 'challenge one fileURL', 'challenge one hint');
    // });
});