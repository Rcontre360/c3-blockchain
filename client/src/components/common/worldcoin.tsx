import { useMetaMask } from "@/context/useMetamask";
import { IDKitWidget, solidityEncode } from "@worldcoin/idkit"; // add import for solidityEncode

declare enum CredentialType {
  Orb = "orb",
  Phone = "phone",
}

const WorldcoinSDK = () => {
  const { wallet } = useMetaMask(); // get the user's wallet address

  return (
    <IDKitWidget
      app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain
      action="claim_nft"
      signal={wallet} // only for on-chain use cases, this is used to prevent tampering with a message
      onSuccess={() => {}}
      // no use for handleVerify, so it is removed
      credential_types={[CredentialType["Orb"]]} // we recommend only allowing orb verification on-chain
      enableTelemetry
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};
