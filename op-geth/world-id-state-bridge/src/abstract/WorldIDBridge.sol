//SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {IWorldID} from "../interfaces/IWorldID.sol";

import {SemaphoreTreeDepthValidator} from "../utils/SemaphoreTreeDepthValidator.sol";
import {SemaphoreVerifier} from "semaphore/base/SemaphoreVerifier.sol";

import "forge-std/console.sol";

/// @title Bridged World ID
/// @author Worldcoin
/// @notice A base contract for the WorldID state bridges that exist on other chains. The state
///         bridges manage the root history of the identity merkle tree on chains other than
///         mainnet.
/// @dev This contract abstracts the common functionality, allowing for easier understanding and
///      code reuse.
/// @dev This contract is very explicitly not able to be instantiated. Do not un-mark it as
///      `abstract`.
abstract contract WorldIDBridge is IWorldID {
    ///////////////////////////////////////////////////////////////////////////////
    ///                              CONTRACT DATA                              ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice The depth of the merkle tree used to store identities.
    uint8 internal treeDepth;

    /// @notice The amount of time a root is considered as valid on the bridged chain.
    uint256 internal ROOT_HISTORY_EXPIRY = 1 hours;

    /// @notice The value of the latest merkle tree root.
    uint256 internal _latestRoot;

    /// @notice The mapping between the value of the merkle tree root and the timestamp at which it
    ///         entered the root history.
    mapping(uint256 => uint128) public rootHistory;

    /// @notice The time in the `rootHistory` mapping associated with a root that has never been
    ///         seen before.
    uint128 internal constant NULL_ROOT_TIME = 0;

    /// @notice The verifier instance needed to operate within the semaphore protocol.
    SemaphoreVerifier internal semaphoreVerifier = new SemaphoreVerifier();

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                 ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when the provided semaphore tree depth is unsupported.
    ///
    /// @param depth The tree depth that was passed.
    error UnsupportedTreeDepth(uint8 depth);

    /// @notice Thrown when attempting to validate a root that has expired.
    error ExpiredRoot();

    /// @notice Thrown when attempting to validate a root that has yet to be added to the root
    ///         history.
    error NonExistentRoot();

    /// @notice Thrown when attempting to update the timestamp for a root that already has one.
    error CannotOverwriteRoot();

    /// @notice Thrown if the latest root is requested but the bridge has not seen any roots yet.
    error NoRootsSeen();

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  EVENTS                                 ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Emitted when a new root is received by the contract.
    ///
    /// @param root The value of the root that was added.
    /// @param supersedeTimestamp The L1 time at which `root` became the latest root, and the prior
    ///        latest root became a member of the root history.
    event RootAdded(uint256 root, uint128 supersedeTimestamp);

    /// @notice Emitted when the expiry time for the root history is updated.
    ///
    /// @param newExpiry The new expiry time.
    event RootHistoryExpirySet(uint256 newExpiry);

    ///////////////////////////////////////////////////////////////////////////////
    ///                               CONSTRUCTION                              ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Constructs a new instance of the state bridge.
    ///
    /// @param _treeDepth The depth of the identities merkle tree.
    constructor(uint8 _treeDepth) {
        if (!SemaphoreTreeDepthValidator.validate(_treeDepth)) {
            revert UnsupportedTreeDepth(_treeDepth);
        }

        treeDepth = _treeDepth;
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                              ROOT MIRRORING                             ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice This function is called by the state bridge contract when it forwards a new root to
    ///         the bridged WorldID.
    /// @dev Intended to be called from a privilege-checked implementation of `receiveRoot` or an
    ///      equivalent operation.
    ///
    /// @param newRoot The value of the new root.
    /// @param supersedeTimestamp The value of the L1 timestamp at the time that `newRoot` became
    ///        the current root. This timestamp is associated with the latest root at the time of
    ///        the call being inserted into the root history.
    ///
    /// @custom:reverts CannotOverwriteRoot If the root already exists in the root history.
    /// @custom:reverts string If the caller is not the owner.
    function _receiveRoot(uint256 newRoot, uint128 supersedeTimestamp) internal {
        uint256 existingTimestamp = rootHistory[newRoot];

        if (existingTimestamp != NULL_ROOT_TIME) {
            revert CannotOverwriteRoot();
        }

        uint256 rootBeingReplaced = _latestRoot;
        _latestRoot = newRoot;
        rootHistory[rootBeingReplaced] = supersedeTimestamp;

        emit RootAdded(newRoot, supersedeTimestamp);
    }

    /// @notice Reverts if the provided root value is not valid.
    /// @dev A root is valid if it is either the latest root, or not the latest root but has not
    ///      expired.
    ///
    /// @param root The root of the merkle tree to check for validity.
    ///
    /// @custom:reverts ExpiredRoot If the provided `root` has expired.
    /// @custom:reverts NonExistentRoot If the provided `root` does not exist in the history.
    function requireValidRoot(uint256 root) internal view {
        // The latest root is always valid.
        if (root == _latestRoot) {
            return;
        }

        // Otherwise, we need to check things via the timestamp.
        uint128 rootTimestamp = rootHistory[root];

        // A root does not exist if it has no associated timestamp.
        if (rootTimestamp == 0) {
            revert NonExistentRoot();
        }

        // A root is no longer valid if it has expired.
        if (block.timestamp - rootTimestamp > ROOT_HISTORY_EXPIRY) {
            revert ExpiredRoot();
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                             SEMAPHORE PROOFS                            ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice A verifier for the semaphore protocol.
    /// @dev Note that a double-signaling check is not included here, and should be carried by the
    ///      caller.
    ///
    /// @param root The of the Merkle tree
    /// @param signalHash A keccak256 hash of the Semaphore signal
    /// @param nullifierHash The nullifier hash
    /// @param externalNullifierHash A keccak256 hash of the external nullifier
    /// @param proof The zero-knowledge proof
    ///
    /// @custom:reverts string If the zero-knowledge proof cannot be verified for the public inputs.
    function verifyProof(
        uint256 root,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) public view virtual {
        // Check the preconditions on the inputs.
        requireValidRoot(root);

        // With that done we can now verify the proof.
        semaphoreVerifier.verifyProof(
            root, nullifierHash, signalHash, externalNullifierHash, proof, treeDepth
        );
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                              DATA MANAGEMENT                            ///
    ///////////////////////////////////////////////////////////////////////////////

    /// @notice Gets the value of the latest root.
    ///
    /// @custom:reverts NoRootsSeen If there is no latest root.
    function latestRoot() public view virtual returns (uint256) {
        if (_latestRoot == 0) {
            revert NoRootsSeen();
        }

        return _latestRoot;
    }

    /// @notice Gets the amount of time it takes for a root in the root history to expire.
    function rootHistoryExpiry() public view virtual returns (uint256) {
        return ROOT_HISTORY_EXPIRY;
    }

    /// @notice Sets the amount of time it takes for a root in the root history to expire.
    /// @dev When implementing this function, ensure that it is guarded on `onlyOwner`.
    ///
    /// @param expiryTime The new amount of time it takes for a root to expire.
    function setRootHistoryExpiry(uint256 expiryTime) public virtual;

    /// @notice Sets the amount of time it takes for a root in the root history to expire.
    /// @dev Intended to be called from a privilege-checked implementation of `receiveRoot`.
    ///
    /// @param expiryTime The new amount of time it takes for a root to expire.
    function _setRootHistoryExpiry(uint256 expiryTime) internal virtual {
        ROOT_HISTORY_EXPIRY = expiryTime;

        emit RootHistoryExpirySet(expiryTime);
    }

    /// @notice Gets the Semaphore tree depth the contract was initialized with.
    function getTreeDepth() public view virtual returns (uint8) {
        return treeDepth;
    }
}
