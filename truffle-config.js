const path = require("path");

module.exports = {

    contracts_build_directory: path.join(__dirname, "app/src/contracts"),
    networks: {
        develop: {
            host: "ganache",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",    // Any network (default: none)
        }
    },
    compilers: {
        solc: {
            version: "0.8.10",
        }
    }
};
