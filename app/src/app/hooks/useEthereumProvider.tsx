import { BrowserProvider, Signer, ethers } from 'ethers';
import { useState } from 'react';

function useEthereumProvider() {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<Signer>();

  const connectToMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request access to the user's MetaMask account
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setProvider(undefined);
      }
    } else {
      console.log('MetaMask not installed; using read-only defaults');
    }
  };

  const disconnect = async () => {
    setProvider(undefined);
    setSigner(undefined);
  };

  return { provider, signer, connectToMetamask, disconnect };
}

export default useEthereumProvider;
