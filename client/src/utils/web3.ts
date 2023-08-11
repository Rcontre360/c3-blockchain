import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import contracts from "@/contracts";
import { ethers } from "ethers";

export const getWeb3 = (provider?: any) => {
  return new Web3(provider ? provider : (window as any).ethereum);
};

export const getContractCustom = (
  factory: "ERC20" | "C3Registry" | "WorldIDRouter",
  address: string,
  provider: any,
) => {
  const web3 = getWeb3(provider);
  const contract: any = contracts[factory];
  return new web3.eth.Contract(contract, address);
};

export const deployContract = async (type: "ERC20") => {
  const contractData: any = contracts[type];
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const factory = new ethers.ContractFactory(
      contractData.abi,
      contractData.bytecode,
      signer,
    );
    const contract = await factory.deploy();
    const address = await contract.getAddress();
    return address;
  } catch (e) {
    console.log(e);
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
  return `${addr.substring(0, 8)}...`;
};

export const getProvider = async () => {
  return await detectEthereumProvider({ silent: true });
};

export const getAccounts = async () => {
  return await (window as any).ethereum.request({ method: "eth_accounts" });
};

export const switchEthereumChain = async (chainId: string) => {
  const provider = await getProvider();
  return await (provider as any).request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }],
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
