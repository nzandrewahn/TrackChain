import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

function useLocalProvider() {
  const [provider, setProvider] = useState<any>();

  const PRIVATE_KEY =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  useEffect(() => {
    const init = async () => {
      const _provider = ethers.getDefaultProvider('http://localhost:8545');
      setProvider(_provider);
      // const wallet = new ethers.Wallet(PRIVATE_KEY, _provider);
      // const _signer = await wallet.connect(_provider);
      // setSigner(_signer);
    };

    init();
  }, []);

  // const connectToMetamask = async () => {
  //   // Request access to the user's MetaMask account
  // };

  const disconnect = async () => {
    setProvider(undefined);
  };

  return { provider, disconnect };
}

export default useLocalProvider;
