const path = require("path");
const fs = require('fs');

const HDWalletProvider = require('@truffle/hdwallet-provider');

const secrets = JSON.parse(
    fs.readFileSync(".secrets").toString().trim()
);

module.exports = {

    contracts_build_directory: path.join(__dirname, "app/src/contracts"),
    networks: {
        develop: {
            host: "localhost",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: 1337,    // Any network (default: none)
        },
        ropsten: {
            provider: () => new HDWalletProvider(secrets.seed, `https://ropsten.infura.io/v3/${secrets.projectId}`),
            network_id: 3,       // Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },
        private: {
        provider: () => new HDWalletProvider(secrets.mnemonic, secrets.privateNetwork),
        network_id: 3458,   // This network is yours, in the cloud.
        production: true    // Treats this network as if it was a public net. (default: false)
        }
    },
    compilers: {
        solc: {
            version: "0.8.10",
        }
    }
};
