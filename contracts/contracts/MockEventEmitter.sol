// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/StorageSlot.sol";

contract MockEventEmitter {
    uint public timestamp;
    uint public root;
    address public caller;

    event RootSentMultichain(uint256 root, uint128 timestamp);

    constructor() {}

    function emitEvent(uint _root, uint128 _timestamp) public payable {
        emit RootSentMultichain(_root, _timestamp);
    }

    function receiveRoot(uint256 newRoot, uint128 newTimestamp) external virtual {
        caller = msg.sender;
        root = newRoot;
        timestamp = newTimestamp;
    }

    fallback() external payable {
        root = 1111;
        timestamp = 1111;
    }

    receive() external payable {
        root = 1111;
        timestamp = 1111;
    }
}
