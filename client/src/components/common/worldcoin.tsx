import React from "react";
import { useMetaMask } from "@/context/useMetamask";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit"; // add import for solidityEncode
import { BigNumberish, ethers } from "ethers";
import RegistryABI from "../../contracts/C3RewardsRegistry.json";
import { attach, getEthersProvider, registerContract } from "@/utils/web3";

const registryAddress = "0x4DD7f05011ca6fdaC12A5Db36c8387bF12554A9E";

export const decode = (type: string, encodedString: string) => {
  const abi = ethers.AbiCoder.defaultAbiCoder();
  return abi.decode([type], encodedString)[0];
};

declare enum CredentialType {
  Orb = "orb",
  Phone = "phone",
}

export const WorldcoinSDK = ({
  children,
  contract,
  onProofFinished,
}: {
  children: any;
  contract: string;
  onProofFinished: Function;
}) => {
  const { wallet } = useMetaMask(); // get the user's wallet address
  const handleProofCreation = async (proofInput: any) => {
    try {
      console.log("PROOFF CREATED");
      const decodedRoot = decode("uint256", proofInput?.merkle_root ?? "");
      const decodedNullifier = decode(
        "uint256",
        proofInput?.nullifier_hash ?? "",
      );
      const decodedProof = decode(
        "uint256[8]",
        proofInput?.proof ?? "",
      ).toArray();

      onProofFinished({
        wallet,
        decodedRoot,
        decodedNullifier,
        decodedProof,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IDKitWidget
      app_id="app_staging_24a51708d58ec102b8a8583588108d0f"
      action="register-fee-receiver"
      signal={wallet}
      onSuccess={handleProofCreation}
      credential_types={[CredentialType["Orb"]]}
      enableTelemetry
    >
      {({ open }: any) => <button onClick={open}>{children}</button>}
    </IDKitWidget>
  );
};
