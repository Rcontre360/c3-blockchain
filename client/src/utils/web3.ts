import detectEthereumProvider from "@metamask/detect-provider";
import Web3, {TransactionReceipt} from "web3";
import contracts from "@/contracts";
import {ethers, Signer} from "ethers";
import {ADDRESS_REGISTRY} from "@/const";

export const getWeb3 = (provider?: any) => {
  return new Web3(provider ? provider : (window as any).ethereum);
};

export const getContractCustom = (
  factory: "ERC20" | "C3Registry" | "WorldIDRouter",
  address: string,
  provider: any
) => {
  const web3 = getWeb3(provider);
  const contract: any = contracts[factory];
  return new web3.eth.Contract(contract.abi, address);
};

export const deployContract = async (type: "ERC20") => {
  const contractData: any = contracts[type];
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);
    const contract = await factory.deploy();
    const address = await contract.getAddress();
    return address;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const attach = (abi: any, address: string, signer: Signer) => {
  return new ethers.Contract(address, abi, signer);
};

export const testContract = async (
  address: string,
  args: {
    wallet: string;
  }
) => {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contractData: any = contracts["ERC20"];

    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);

    const erc20 = (await factory.attach(address)) as any;

    return (await erc20.mint(args.wallet, "100000000000")) as TransactionReceipt;
  } catch (e) {
    console.log(e);
    return {gasUsed: 1} as any;
  }
};

export const registerContract = async (
  address: string,
  proofValues?: {
    wallet: string;
    decodedRoot: string;
    decodedNullifier: string;
    decodedProof: string[];
  }
) => {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    console.log(signer.address, provider, ADDRESS_REGISTRY, address, proofValues);

    const contractData: any = contracts["C3Registry"];

    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);

    const C3Registry = await factory.attach(ADDRESS_REGISTRY);

    //address receiver,
    //address signal,
    //uint256 root,
    //uint256 nullifierHash,
    //uint256[8] calldata proof

    proofValues
      ? await (C3Registry as any).registerContract(
        "0x94750381bE1AbA0504C666ee1DB118F68f0780D4",
        proofValues.wallet,
        proofValues.decodedRoot,
        proofValues.decodedNullifier,
        proofValues.decodedProof,
        {gasLimit: "100000000"}
      )
      : await (C3Registry as any).mockRegister(address, true);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  if (addr.substring !== undefined) {
    return `${addr?.substring(0, 8)}...`;
  }
};

export const getProvider = async () => {
  return await detectEthereumProvider({silent: true});
};

export const getEthersProvider = () => {
  return new ethers.BrowserProvider((window as any).ethereum);
};

export const getAccounts = async () => {
  return await (window as any).ethereum.request({method: "eth_accounts"});
};

export const switchEthereumChain = async (chainId: string) => {
  const provider = await getProvider();
  return await (provider as any).request({
    method: "wallet_switchEthereumChain",
    params: [{chainId}],
  });
};

export const getChainId = async () => {
  return await (window as any).ethereum.request({
    method: "eth_chainId",
  });
};

export const getAppData = () => {
  return;
};
