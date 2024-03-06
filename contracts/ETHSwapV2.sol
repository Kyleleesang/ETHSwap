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
    IUniswapV2Router02 public swapRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    uint24 private constant poolFee = 3000;

    constructor(IUniswapV2Router02 _swapRouter)  {
        owner = msg.sender;
        swapRouter = _swapRouter;
    }

    function swapEtherToToken(address _token, uint minAmount) external payable returns (uint256 amount) {
        require(msg.value > 0, "Must pass non 0 ETH amount");
         uint deadline = block.timestamp + 15;
        address[] memory path = new address[](2);
        path[0] = swapRouter.WETH();
        path[1] = _token;
        swapRouter.swapETHForExactTokens{ value: msg.value }(minAmount, path, address(this), deadline);
        (bool success,) = msg.sender.call{ value: address(this).balance }("");
        require(success, "refund failed");
        return amount;
    }

    function setRouter(address _router) external {
        require(msg.sender == owner, "Only owner can change the router");
        swapRouter = IUniswapV2Router02(_router);
    }

}