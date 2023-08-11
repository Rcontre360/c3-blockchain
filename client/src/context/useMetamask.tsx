/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
  useMemo,
} from "react";

import { ADDRESS_REGISTRY, NETWORK_ID } from "@/const";
import { toast } from "react-hot-toast";
import {
  getProvider as getEthProvider,
  switchEthereumChain,
  deployContract,
  getChainId,
  getContractCustom,
} from "@/utils/web3";
import Web3 from "web3";

export interface MetaMaskContextData {
  wallet: string;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  networkExpected: string | undefined;
  isConnecting: boolean;
  registeredAddresses: string[];
  connectMetaMask: () => void;
  switchNetwork: (arg1: string) => void;
  clearError: () => void;
  updateBalance: (arg1: any) => void;
  deployContract: any;
  getRegisteredAddresses: () => void;
}

const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData,
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [userWallet, setWallet] = useState("");

  const [registeredAddresses, setRegisteredAddressses] = useState<string[]>([]);

  const getRegisteredAddresses = useCallback(async () => {
    try {
      const provider = new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_RPC || "http://127.0.0.1:8545",
      );

      const registry = getContractCustom(
        "C3Registry",
        ADDRESS_REGISTRY,
        provider,
      );
      const allAddresses: string[] = await registry.methods
        .getAllRegisters()
        .call();
      setRegisteredAddressses(allAddresses);
    } catch (err: any) {
      console.log(err.message);
      toast.error(
        err.message == "User rejected the request."
          ? "Please change your network to C3"
          : err.message,
      );
    }
  }, []);

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const updateWallet = useCallback(async (providedAccounts?: any) => {
    try {
      const accounts =
        providedAccounts ||
        (await (window as any).ethereum.request({ method: "eth_accounts" }));
      if (accounts.length === 0) {
        // If there are no accounts, then the user is disconnected
        setWallet("");
        return;
      }
      const chainId = await getChainId();
      console.log("a", accounts, chainId, NETWORK_ID);
      if (chainId !== NETWORK_ID) {
        await switchEthereumChain(NETWORK_ID);
      }
      console.log(accounts[0]);
      setWallet(accounts[0]);
    } catch (err: any) {
      console.log(err.message);
      toast.error(
        err.message == "User rejected the request."
          ? "Please change your network to C3"
          : err.message,
      );
    }
  }, []);

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted. Also sets Network Expected and ask the user to change if the user is in the wrong network.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await getEthProvider();
      setHasProvider(Boolean(provider));
      if (provider) {
        updateWallet();
        (window as any).ethereum.on("accountsChanged", updateWallet);
        (window as any).ethereum.on("chainChanged", () =>
          window.location.reload(),
        );
      }
    };
    getProvider();
    return () => {
      (window as any).ethereum?.removeListener("accountsChanged", updateWallet);
      (window as any).ethereum?.removeListener("chainChanged", updateWallet);
    };
  }, [updateWallet]);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();

      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const metamaskContextValue = useMemo(() => {
    return {
      wallet: userWallet,
      hasProvider,
      error: !!errorMessage,
      networkExpected: NETWORK_ID,
      errorMessage,
      isConnecting,
      connectMetaMask,
      switchNetwork: switchEthereumChain,
      clearError,
      updateBalance: updateWallet,
      deployContract,
      getRegisteredAddresses,
      registeredAddresses,
    };
  }, [userWallet, connectMetaMask, deployContract]);

  return (
    <MetaMaskContext.Provider value={metamaskContextValue}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"',
    );
  }
  return context;
};
