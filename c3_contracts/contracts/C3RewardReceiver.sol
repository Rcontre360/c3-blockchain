// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/StorageSlot.sol";

contract C3RewardReceiver {
    bytes32 public constant _REWARD_SLOT = keccak256("rewards.address.c3");
    event JustEvent(address caller, uint value);

    constructor(address _feeReceiver) {
        StorageSlot.getAddressSlot(_REWARD_SLOT).value = _feeReceiver;
    }

    function getFeeReceiver() public view returns (address) {
        return StorageSlot.getAddressSlot(_REWARD_SLOT).value;
    }

    function normalCall() public payable {
        emit JustEvent(msg.sender, msg.value);
    }
}
