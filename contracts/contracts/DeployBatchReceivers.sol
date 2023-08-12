// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./MockERC20.sol";

contract DeployReceiversBatch {
    function deploy() public returns (address[] memory) {
        address receiver = msg.sender;
        address[] memory contracts = new address[](15);

        for (uint8 i = 0; i < 15; i++) {
            contracts[i] = address(new MockERC20(receiver));
        }

        return contracts;
    }
}
