# Sample Hardhat Project

ETHSwapV2 uses the UniswapV2Router02 interface and ETHSwapV3 uses anything that has an ISwapRouter02 interface from UniswapV3.
UniswapV3 is currently not deployed on Sepolia officially but deploy scripts are provided which can be swapped out with unofficial 
versions that will be or currently are on Sepolia as long as it implements the ISwapRouter interface.
Verified contract Source Code for UniswapV2Router02: https://sepolia.etherscan.io/address/0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008#code
Verified contract source code for SwapRouter02: https://sepolia.etherscan.io/address/0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E
ETHSwapV2 deployed to: 0x6EaAd9A14c6d840d38Ef34529e562A3e038a68da
ETHSwapV3 deployed to: 0x8963f3025aCb6964704172BAAc06E308a66389d4

Make sure to compile ETHSwapV2 and ETHSwapV3 seperately as they use different solidity versions


Potential Errors:

    Transaction Revert:

    ****Testnet Pools are generally less liquid
    When trading tokens be sure to make sure that the pair exist and that there is enough liquidity in the pools 
    or the transaction might get a revert

    ****Insufficient Gas
    make sure to specify a high enough gas price as the deadline is currently the block.timestamp plus 15 in production
    we will allow users to pass this in custom from the front end






This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:
Deploy to Sepolia: npx hardhat run scripts/deploy.js (locally) || node scripts/deploy.js --network Sepolia

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
