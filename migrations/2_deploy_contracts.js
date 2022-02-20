const Web3Utils = require("web3-utils");
const AccessContr0l = artifacts.require("AccessContr0l");
const Contests = artifacts.require("Contests");
const Challenges = artifacts.require("Challenges");
const Teams = artifacts.require("Teams");
const Moves = artifacts.require("Moves");

module.exports = async (deployer, network, accounts) => {

    const systemAdmin = accounts[0];
    const contestAdmin = accounts[0];
    await deployer.deploy(AccessContr0l, accounts[0]);
    const AccessContr0lInstance = await AccessContr0l.deployed();
    await deployer.deploy(Contests, AccessContr0l.address);
    const ContestInstance = await Contests.deployed();
    await deployer.deploy(Challenges, Contests.address);
    const ChallengesInstance = await Challenges.deployed();
    await deployer.deploy(Teams, Contests.address);
    const TeamsInstance = await Teams.deployed();
    await deployer.deploy(Moves, Contests.address, Challenges.address, Teams.address);
    const MovesInstance = await Moves.deployed();
    // test

    let contests = [
        ['Jeopardy', 'ASIS CTF Quals 2022', 0, parseInt(Date.now() / 1000) + 10, parseInt(Date.now() / 1000) + 60, 'ASIS CTF Quals 2022 :)'],
        ['Jeopardy', 'Crypto CTF 2022', 0, parseInt(Date.now() / 1000) + 10, parseInt(Date.now() / 1000) + 60, 'Crypto CTF is an online competition for hackers to test, evaluate, and expand their cryptography exploiting skills. In this CTF, we will provide various crypto challenges regarding modern cryptography techniques.\n' +
        'All crypto lovers are most welcome!\n' +
        'Crypto CTF is a revenge for everlasting complaints by CTF participants about crypto challenges in CTF contests. In this brand-new tournament, we are trying to provide the crypto lovers with fun and challenging pure crypto tasks to squeeze their heart and test their passion for cryptography.\n' +
        'Each task will be based on a particular cryptographic primitive, or it will include a direct application of cryptography in other fields.\n' +
        'The organizers of these tournaments generously offer their skills\' knowledge to design original Crypto tasks and challenges for similar contests.\n' +
        '\n' +
        'Long Live Crypto :)'],
        ['Jeopardy', 'Midnight Sun CTF 2022 Finals', 0, parseInt(Date.now() / 1000) + 10, parseInt(Date.now() / 1000) + 600, 'Midnight Sun CTF is HackingForSoju\'s annual CTF event to promote the cyber security eco-system in the Swedish region.\n' +
        '\n' +
        'WHEN and WHERE\n' +
        'The final event is in Sweden from June 18th - 19th, with the online qualifier running from April 2nd - 3rd.'],
        ['Jeopardy', 'WeCTF 2022', 0, parseInt(Date.now() / 1000) + 10, parseInt(Date.now() / 1000) + 1200, 'WeCTF is a Web-only CTF that has both intro-level challenges and diabolical ones.'],
        ['Jeopardy', 'SEETF 2022', 0, parseInt(Date.now() / 1000) + 3600, parseInt(Date.now() / 1000) + 5 * 3600, 'SEETF is a cybersecurity Capture the Flag competition hosted by the Social Engineering Experts CTF team.\n' +
        '\n' +
        'Categories include web exploitation, binary exploitation, reverse engineering, forensics, cryptography and more.\n' +
        '\n' +
        'Registration starts in May 2022.\n' +
        '\n' +
        'Join our Discord server for updates: https://discord.gg/JNVzKc7PJR\n' +
        '\n' +
        'Sponsors:\n' +
        '• TryHackMe\n' +
        '• PentesterLab\n' +
        '• HackTheBox\n' +
        '\n' +
        'More to come!'],
        ['Jeopardy', 'RuCTFE 2022', 0, parseInt(Date.now() / 1000) + 86400, parseInt(Date.now() / 1000) + 2 * 86400, 'International online challenge in information security. Good choice to start playing A/D, because we\'re providing vulnbox in our cloud, so you don\'t need to be an administrator. Also good choice for pros — you will battle with teams from all over the world! From Yekaterinburg with <3']
    ]
    let challenges = [
        ['Jeopardy', 'KoG-146', 'Web', 'King of Glory is a funny game. Our website has a list of players.', 'http://202.120.7.213:11181', '', '', 150],
        ['Jeopardy', 'Temmo\'s Tiny Shop', 'Web', 'Enjoy online shopping? It\'s so convenient, and I like it very much.', 'http://202.120.7.197/', '', '', 200],
        ['Jeopardy', 'Choices-297', 'Reverse', 'All roads lead to Vegas.\n' +
        '\n' +
        'Compile: clang -Xclang -load -Xclang lib0opsPass.so -mllvm -oopsSeed=BAADF00DCAFEBABE3043544620170318 source.c\n' +
        '\n' +
        'Clang && LLVM Version: 3.9.1', '', 'https://github.com/ctfs/write-ups-2017/blob/master/0ctf-quals-2017/reverse/Choices-297/choices.tar.gz', '', 100],
        ['Jeopardy', 'engineTest-261', 'Reverse', 'run go.sh and check yout flag...', '', 'https://github.com/ctfs/write-ups-2017/blob/master/0ctf-quals-2017/reverse/engineTest-261/engineTest_81bd3eba5988a5bf7da1dae59f68df2c.zip', '', 200],
        ['Jeopardy', 'Baby Heap 2017', 'Pwn', 'Let\'s practice some basic heap techniques in 2017 together!', '202.120.7.218:2017', 'https://github.com/ctfs/write-ups-2017/blob/master/0ctf-quals-2017/pwn/Baby-Heap-2017-255/libc.so.6_b86ec517ee44b2d6c03096e0518c72a1', '', 100],
        ['Jeopardy', 'Survey', 'Misc', 'Please fill out this Survey (https://docs.google.com/forms/d/e/1FAIpQLSfw-2TaHtx4eHX54Vlr5LnMrQJWoPJZ-FyvmUCSefsFSY3J8g/viewform).\n' +
        '\n' +
        'Thank you for participating in 0CTF 2017 Quals!', 'https://docs.google.com/forms/d/e/1FAIpQLSfw-2TaHtx4eHX54Vlr5LnMrQJWoPJZ-FyvmUCSefsFSY3J8g/viewform).', '', '', 250],
        ['Jeopardy', 'integrity', 'Crypto', 'Just a simple scheme.\n' +
        '\n' +
        'nc 202.120.7.217 8221', '', 'https://github.com/ctfs/write-ups-2017/blob/master/0ctf-quals-2017/crypto/integrity-75/integrity_f2ed28d6534491b42c922e7d21f59495.zip', '', 300],

    ];
    let flags = [
        ['4c9bdaf5-fb3c-4d27-9f54-34590cd2bf4d', Web3Utils.randomHex(32)],
        ['ea45b476-5cc7-4f6c-84b1-3a788880e970', Web3Utils.randomHex(32)],
        ['d054e299-d17d-4ef9-8a05-6ed3ef42accc', Web3Utils.randomHex(32)],
        ['46b96964-0e3b-47de-8235-9df1f213adac', Web3Utils.randomHex(32)],
        ['f3d348ed-babe-4f27-aaa6-6374afcf3a6a', Web3Utils.randomHex(32)],
        ['171c70cd-0551-4e10-b165-450a5f8565dc', Web3Utils.randomHex(32)],
        ['171c70cd-0551-4e10-b165-450a5f8565dc', Web3Utils.randomHex(32)]
    ]
    await AccessContr0lInstance.grantRole(Web3Utils.soliditySha3('CONTEST_ADMIN'), contestAdmin);
    await Promise.all(contests.map(contest => ContestInstance.add(contest)));
    await Promise.all([...Array(4).keys()].map(index => TeamsInstance.applyContest(index + 1, ['Cock_Intelligence_Agency', systemAdmin, [accounts[1], accounts[2]]])));
    await Promise.all([false, true, true].map((result, index) => TeamsInstance.auditTeams(index + 1, [index + 1], [result])));
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(10001);

    [...Array(4).keys()].map(async (index) =>
        await Promise.all(challenges.map(challenge => ChallengesInstance.add(index + 1, challenge)))
    );
    [...Array(3).keys()].map(async (index) =>
        await Promise.all(flags.map((flag, i) => MovesInstance.commitForMember(index + 2, index + 2, challenges.length * (index + 1) + i + 1, Web3Utils.soliditySha3(flag[0], flag[1]))))
    );
    [...Array(4).keys()].map(async (index) =>
        await Promise.all(flags.map((flag, i) => MovesInstance.commitForAdmin(index + 1, challenges.length * index + i + 1, Web3Utils.soliditySha3(flag[0], flag[1]))))
    );
    await delay(50001);
    [...Array(2).keys()].map(async (index) =>
        await Promise.all(flags.map((flag, i) => MovesInstance.revealForAdmins(index + 1, [challenges.length * index + i + 1], [flag[0]], [flag[1]])))
    );
    await Promise.all(flags.map((flag, i) => MovesInstance.revealForMembers(2, 2, [challenges.length + i + 1], [flag[0]], [flag[1]])));

};
