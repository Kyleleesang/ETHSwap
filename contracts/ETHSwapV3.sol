//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';


interface ERC20Swapper {
    /// @dev swaps the `msg.value` Ether to at least `minAmount` of tokens in `address`, or reverts
    /// @param token The address of ERC-20 token to swap
    /// @param minAmount The minimum amount of tokens transferred to msg.sender
    /// @return The actual amount of transferred tokens
    function swapEtherToToken(address token, uint minAmount) external payable returns (uint);
}

contract ETHSwap is ERC20Swapper{
    //
    address private owner;
    ISwapRouter public swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    //set it manually so that a compromised router cannot switch the WETH address
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    //most pools have the 0.3% fee
    uint24 private constant poolFee = 3000;
    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
        owner = msg.sender;
    }

    //Using exact Input single instead of output due to the minimum amount of tokens to be received instead of output
function swapEtherToToken(address _token, uint256 minAmount) external payable returns (uint amount) {
    require(msg.value > 0, "Must pass non 0 ETH amount");
      
    uint256 deadline = block.timestamp + 15; 
    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
                tokenIn: WETH,
                tokenOut: _token,
                fee: poolFee,
                recipient: msg.sender,
                deadline: deadline,
                amountIn: msg.value,
                amountOutMinimum: minAmount,
                sqrtPriceLimitX96: 0
            });

    
    amount = swapRouter.exactInputSingle{ value: msg.value }(params);
}
//used by owner just incase router is compromised
function setRouter(address _router) external {
        require(msg.sender == owner, "Only owner can change the router");
        swapRouter = ISwapRouter(_router);
    }

}