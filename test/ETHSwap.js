const { expect, constant, utils } = require("chai");
const { ethers } = require("ethers");
const hre = require("hardhat");
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

describe("ETHSwap contract", function () {

  async function DeploySwapFixture(){

    let dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

        // Get signers for testing accounts
    const signers = await hre.ethers.getSigners();
    owner = signers[0];
    anotherAccount = signers[1];

    // Deploy the contract
    const ETHSwap = await hre.ethers.getContractFactory("ETHSwap");
    let ethSwap = await ETHSwap.deploy("0xE592427A0AEce92De3Edee1F18E0157C05861564");
    await ethSwap.waitForDeployment();
    return { ethSwap, owner, anotherAccount, dai };
    console.log("ETHSwap deployed to:", ethSwap.address);
  }


  describe("swapEtherToToken", function () {
    it("Should successfully deploy the contract", async function () {
      const {ethSwap} = await DeploySwapFixture();
      console.log("ethSwap deployed to:", ethSwap.address);
    });

    it("should revert if not enough Ether is sent", async function () {
      const {owner, ethSwap, dai} = await DeploySwapFixture();
      const minAmount = 100; // arbitrary token amount
      await expect(ethSwap.connect(owner).swapEtherToToken("0x6B175474E89094C44Da98b954EedeAC495271d0F", minAmount, {value: 1})).to.be.reverted;
    });

    it("should swap Ether to DAI successfully", async function () {
      const {owner, ethSwap} = await DeploySwapFixture();
      const minAmount = 1; // arbitrary token amount
      const value = 0.05;
      const DAIcontract = await hre.ethers.getContractAt("Dai", "0x6B175474E89094C44Da98b954EedeAC495271d0F")
      // Get token balance before swap not checking to see if its zero before as the test will be run on sepolia
      const WrappedBalanceBefore = await DAIcontract.balanceOf(owner.address);
      await ethSwap.connect(owner).swapEtherToToken("0x6B175474E89094C44Da98b954EedeAC495271d0F", minAmount, { value: value });
      // Get token balance after swap
      const WrappedBalanceAfter = await DAIcontract.balanceOf(owner.address);
      //have the owner call swapEtherToToken from the contract
      // Check if token balance has increased
      expect(WrappedBalanceAfter.sub(WrappedBalanceBefore)).to.be.greaterThan(WrappedBalanceBefore);
    });
  });

  describe("Gas Costs", function(){
    it("Should log the cost of gas", async function(){
      const {ethSwap} = await DeploySwapFixture();
      console.log("ethSwap deployed to:", ethSwap.address);
      var routeCost = await ethSwap.estimateGas.swapEtherToToken("0x6B175474E89094C44Da98b954EedeAC495271d0F", 0.05, {value: 0.05 })
      console.log(routeCost);
    })
  })

  describe("setRouter", function () {
    it("should revert if called by non-owner", async function () {
      const {ethSwap, anotherAccount} = await DeploySwapFixture();
      const newRouterAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" // use weth address as a dummy
      await expect(ethSwap.connect(anotherAccount).setRouter(newRouterAddress)).to.be.revertedWith("Only owner can change the router");
    });

    it("should allow owner to set a new router", async function () {
      const {owner, ethSwap} = await DeploySwapFixture();
      const newRouterAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Replace with a different router address
      await ethSwap.connect(owner).setRouter(newRouterAddress);
      console.log("ethSwap deployed to:", ethSwap.address);
      expect(await ethSwap.swapRouter()).to.equal(newRouterAddress);
    });
  });
});