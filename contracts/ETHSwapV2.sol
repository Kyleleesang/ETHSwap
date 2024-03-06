pragma solidity ^0.8.19;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
interface ERC20Swapper {
    /// @dev swaps the `msg.value` Ether to at least `minAmount` of tokens in `address`, or reverts
    /// @param token The address of ERC-20 token to swap
    /// @param minAmount The minimum amount of tokens transferred to msg.sender
    /// @return The actual amount of transferred tokens
    function swapEtherToToken(address token, uint minAmount) external payable returns (uint256);
}


contract EthSwapV2 is ERC20Swapper {
    address private owner;
    IUniswapV2Router02 public swapRouter;
    uint24 private constant poolFee = 3000;

    constructor(IUniswapV2Router02 _swapRouter)  {
        owner = msg.sender;
        swapRouter = _swapRouter;
    }

    //Have to swap ETH for WETH first then swap WETH for the token
    function swapEtherToToken(address _token, uint minAmount) external payable returns (uint256 amount) {
        require(msg.value > 0, "Must pass non 0 ETH amount");
        //Just use 15 for now but in production just pass it in custom from the front end
         uint deadline = block.timestamp + 15;
        address[] memory path = new address[](2);
        path[0] = swapRouter.WETH();
        path[1] = _token;
        swapRouter.swapExactETHForTokens{ value: msg.value }(minAmount, path, msg.sender, deadline);
        (bool success,) = msg.sender.call{ value: address(this).balance }("");
        require(success, "refund failed");
        return amount;
    }
    //For changing the router on Sepolia, the WETH address is not needed as it is hardcoded in the router
    //be sure to verify the source code of the weth address of the router for when you change it
    function setRouter(address _router) external {
        require(msg.sender == owner, "Only owner can change the router");
        swapRouter = IUniswapV2Router02(_router);
    }

}