// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/StorageSlot.sol";

contract MockEventEmitter {
    event RootSentMultichain(uint256 root, uint128 timestamp);

    constructor() {}

    function emitEvent() public payable {
        emit RootSentMultichain(uint(100), uint128(msg.value));
    }
}
