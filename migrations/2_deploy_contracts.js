const AccessContr0l = artifacts.require("AccessContr0l");
const Contests = artifacts.require("Contests");
const Challenges = artifacts.require("Challenges");
const Teams = artifacts.require("Teams");
const Moves = artifacts.require("Moves");

module.exports = async (deployer, network, accounts) => {
    //const systemAdmin = '0xdd42E9cDe0535A6d7c545d8C5B8Bdd91A98A7657';
    await deployer.deploy(AccessContr0l, accounts[0]);
    await deployer.deploy(Contests, AccessContr0l.address);
    await deployer.deploy(Challenges, Contests.address);
    await deployer.deploy(Teams, Contests.address);
    await deployer.deploy(Moves, Contests.address, Challenges.address, Teams.address);
};
