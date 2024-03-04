require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("hardhat-gas-reporter");

const Alchemy_API_Key = process.env.Alchemy_API_Key;
const API_URL = process.env.API_URL;
const Sepolia_Private_Key = process.env.Sepolia_Private_Key;
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [Sepolia_Private_Key]
    }
  }
};