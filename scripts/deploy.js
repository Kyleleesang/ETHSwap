// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 const ETHSwap = await hre.ethers.deployContract("ETHSwap", ["0xE592427A0AEce92De3Edee1F18E0157C05861564"]);
 const ethswap = await ETHSwap.deploy();
  console.log("ETHSwap deployed to:", ethswap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
