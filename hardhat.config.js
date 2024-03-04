require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("hardhat-gas-reporter");

const Alchemy_API_Key = process.env.Alchemy_API_Key;

const Sepolia_Private_Key = process.env.Sepolia_Private_Key;
module.exports = {
  solidity: "0.8.20",
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.API_URL,
      accounts: [Sepolia_Private_Key]
    }
  }
};