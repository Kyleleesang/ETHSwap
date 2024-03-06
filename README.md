# Sample Hardhat Project


ETHSwapV2 uses the UniswapV2Router02 interface and ETHSwapV3 uses anything that has an ISwapRouter interface from UniswapV3.
UniswapV3 is currently not deployed on Sepolia officially but deploy scripts are provided which can be swapped out with unofficial 
versions that will be or currently are on Sepolia as long as it implements the ISwapRouter interface.
Verified contract Source Code for UniswapV2Router02: https://sepolia.etherscan.io/address/0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008#code
ETHSwapV2 deployed to: 0xc2DA95b2d9174375dfEBdc483C7db9ccC17dA133


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

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
