'use client';

import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import TrackChainABI from '../../../server/out/TrackChain.sol/TrackChain.json';
import CreateFormModal from './components/CreateFormModal';
import ItemGrid from './components/ItemGrid';
import { ItemsResponse } from './types/generated/trackchain-contract';

export default function Home() {
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [items, setItems] = useState<ItemsResponse[]>([]);

  const init = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        TrackChainABI.abi,
        provider
      ) as Contract;
      const getItems = async () => {
        const signer = await provider.getSigner();
        const tx = contract.connect(signer) as any;
        const items = await tx.getItems(signer.getAddress());
        setItems(
          items.map((item: any) => {
            console.log('items', item.title);
            return {
              id: item.id.toString(),
              title: item.title,
              description: item.description,
            };
          })
        );
      };

      contract.on('ItemCreated', (id: any, title: any, description: any) => {
        getItems();
        console.log('Item created', id.toString(), title, description);
      });

      contract.on('ItemUpdated', (id: any, title: any, description: any) => {
        getItems();
        console.log('Item updated', id.toString(), title, description);
      });

      contract.on('ItemDeleted', (id: any) => {
        getItems();
        console.log('Item Deleted', id.toString());
      });

      contract.on('ItemTransfered', (id: any, toAddress: any) => {
        getItems();
        console.log('Item Transferred', id.toString(), toAddress);
      });

      await getItems();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <ItemGrid items={items} />
      <button className='absolute bottom-12 right-14'>
        {/* TODO: Add a nice animation to this later to bob up */}

        <CiCirclePlus
          className='w-11 h-11 text-slate-500 hover:text-black'
          onClick={() => setCreateFormOpen(true)}
        />
      </button>
      <CreateFormModal isOpen={createFormOpen} setIsOpen={setCreateFormOpen} />
    </div>
  );
}
