import React, { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

function WalletConnection({ onProviderChange }) {
  const [account, setAccount] = useState(null);

  const providerOptions = React.useMemo(() => ({
    // MetaMask configuration
    injected: {
      display: {
        name: "MetaMask",
        description: "Connect with the MetaMask browser extension"
      },
      package: null
    },
    // Coinbase Wallet configuration
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "ERC-20 Token Generator",
      }
    }
  }), []);

  const web3Modal = React.useMemo(() => new Web3Modal({
    cacheProvider: true,
    providerOptions
  }), [providerOptions]);

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      onProviderChange(provider);
      setAccount(address);
      console.log("Connected account:", address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    web3Modal.clearCachedProvider();
    onProviderChange(null);
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnection;