// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./C3RewardReceiver.sol";

contract MockERC20 is ERC20 {
    bytes32 public constant _REWARD_SLOT = keccak256("rewards.address.c3");
    event JustEvent(address caller, uint value);

    constructor(address _feeReceiver) ERC20("MockToken", "MT") {
        StorageSlot.getAddressSlot(_REWARD_SLOT).value = _feeReceiver;
    }

    function getFeeReceiver() public view returns (address) {
        return StorageSlot.getAddressSlot(_REWARD_SLOT).value;
    }

    function normalCall() public payable {
        emit JustEvent(msg.sender, msg.value);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address receiver, uint256 amount) external {
        _mint(receiver, amount);
    }
}
