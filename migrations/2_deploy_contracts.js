const AccessContr0l = artifacts.require("AccessContr0l");
const Contests = artifacts.require("Contests");
const Challenges = artifacts.require("Challenges");
const Teams = artifacts.require("Teams");
const Moves = artifacts.require("Moves");
const Jeopardy = artifacts.require("Jeopardy")
const GameBoxes = artifacts.require("GameBoxes")
const AWD = artifacts.require("AWD")
module.exports = async (deployer, network, accounts) => {

    await deployer.deploy(AccessContr0l, accounts[0]);
    await deployer.deploy(Contests, AccessContr0l.address);
    await deployer.deploy(Challenges, Contests.address);
    await deployer.deploy(Teams, Contests.address);
    await deployer.deploy(Moves, Contests.address, Challenges.address, Teams.address);
    await deployer.deploy(Jeopardy, Contests.address, Challenges.address, Teams.address, Moves.address);
    await deployer.deploy(GameBoxes, Contests.address, Challenges.address, Teams.address)
    await deployer.deploy(AWD, Contests.address, Challenges.address, Teams.address, Moves.address)

};
