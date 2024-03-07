//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


import '@uniswap/swap-router-contracts/contracts/interfaces/ISwapRouter0202.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';



interface ERC20Swapper {
    /// @dev swaps the `msg.value` Ether to at least `minAmount` of tokens in `address`, or reverts
    /// @param token The address of ERC-20 token to swap
    /// @param minAmount The minimum amount of tokens transferred to msg.sender
    /// @return The actual amount of transferred tokens
    function swapEtherToToken(address token, uint minAmount) external payable returns (uint256);
}

contract ETHSwap is ERC20Swapper{
    //
    address private owner;
    
    //Mainnet: ISwapRouter02 public swapRouter = ISwapRouter02(0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008);
    ISwapRouter02 public swapRouter;
    //This is the mainnet address, for the purposes of this we will allow a function to change
    //the WETH address so you can deploy on test on different networks
    address private  WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    //most pools have the 0.3% fee
    uint24 private constant poolFee = 3000;
    constructor(ISwapRouter02 _swapRouter) {
        swapRouter = _swapRouter;
        owner = msg.sender;
    }

    //Using exact Input single instead of output due to the minimum amount of tokens to be received instead of output
function swapEtherToToken(address _token, uint minAmount) external payable returns (uint256 amount) {
    require(msg.value > 0, "Must pass non 0 ETH amount");
    //Deadline can be set in the front end to allow custom deadlines but for now this is fine
    uint256 deadline = block.timestamp + 1000; 
    ISwapRouter02.ExactInputSingleParams memory params = ISwapRouter02.ExactInputSingleParams({
                tokenIn: WETH,
                tokenOut: _token,
                fee: poolFee,
                recipient: msg.sender,
                deadline: deadline,
                amountIn: msg.value,
                amountOutMinimum: minAmount,
                sqrtPriceLimitX96: 0
            });
    amount = swapRouter.exactInputSingle{value: msg.value}(params);
    return amount;
}
//used by owner just incase router is compromised
function setRouter(address _router) external {
        require(msg.sender == owner, "Only owner can change the router");
        swapRouter = ISwapRouter02(_router);
    }
//Use this for setting it to different WETHs on testnet there is no official one on Sepolia
//UniswapV2Router02 has a WETH() function that returns the address of the WETH but ISwapRouter02 does not
function setWETH(address _weth) external {
        require(msg.sender == owner, "Only owner can change the WETH address");
        WETH = _weth;
    }

}