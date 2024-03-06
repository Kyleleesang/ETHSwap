const { expect, constant, utils } = require("chai");
const { ethers } = require("ethers");
const hre = require("hardhat");
const AlchemyAPIKey = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


//These are local hardhat test only

describe("ETHSwap contract", function () {

  async function DeploySwapFixture(){
    //const provider = new ethers.providers.AlchemyProvider(network, AlchemyAPIKey)
    // Get signers for testing accounts
    const signers = await hre.ethers.getSigners();
    owner = signers[0];
    anotherAccount = signers[1];

    // Deploy the contract
    const ETHSwap = await hre.ethers.getContractFactory("ETHSwap");
    let ethSwap = await ETHSwap.deploy("0xE592427A0AEce92De3Edee1F18E0157C05861564");
    await ethSwap.waitForDeployment();
    //console.log("ETHSwap deployed to:", ethSwap.address);
    return { ethSwap, owner, anotherAccount,  };
  }


  describe("swapEtherToToken", function () {
    it("Should successfully deploy the contract", async function () {
    const {ethSwap} = await DeploySwapFixture();
    console.log("ETHSwap deployed to:", ethSwap.target);
    });

    it("should revert if not enough Ether is sent", async function () {
      const {owner, ethSwap} = await DeploySwapFixture();
      const minAmount = 100; // arbitrary token amount
      await expect(ethSwap.connect(owner).swapEtherToToken("0x6B175474E89094C44Da98b954EedeAC495271d0F", minAmount, {value: 1})).to.be.reverted;
    });

  });


  describe("Set State variables", function () {
    it("should revert if called by non-owner", async function () {
      const {ethSwap, anotherAccount} = await DeploySwapFixture();
      const newRouterAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" // use weth address as a dummy
      await expect(ethSwap.connect(anotherAccount).setRouter(newRouterAddress)).to.be.revertedWith("Only owner can change the router");
    });

    it("should allow owner to set a new router", async function () {
      const {owner, ethSwap} = await DeploySwapFixture();
      const newRouterAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Replace with a different router address
      await ethSwap.connect(owner).setRouter(newRouterAddress);
      expect(await ethSwap.swapRouter()).to.equal(newRouterAddress);
    });
  });
});