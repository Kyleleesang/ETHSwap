// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 const ETHSwap = await hre.ethers.getContractFactory("ETHSwap");
 const ethswap = await ETHSwap.deploy("0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E");
 await ethswap.waitForDeployment();
  console.log("ETHSwap deployed to:", ethswap.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
