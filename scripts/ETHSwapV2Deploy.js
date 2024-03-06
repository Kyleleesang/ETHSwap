// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
const ETHSwapV2 = await hre.ethers.getContractFactory("EthSwapV2");
//Demo Sepolia testnet address for Uniswap V2 contract source code verified
const ethswapV2 = await ETHSwapV2.deploy("0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008");
await ethswapV2.waitForDeployment();
console.log("ETHSwap deployed to:", ethswapV2.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
