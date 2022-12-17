require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "sepoliaTestnet",
  networks: {
    hardhat: {},
    sepoliaTestnet: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
