import { Dialog } from '@headlessui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import TrackChainABI from '../../../../server/out/TrackChain.sol/TrackChain.json';
import { ItemResponse } from '../types/generated/trackchain-contract';

const DeleteItemModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  item: ItemResponse;
}> = ({ isOpen, setIsOpen, item }) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    console.log('Delete item');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      TrackChainABI.abi,
      signer
    ) as any;
    console.log('contract interface', contract.interface);
    contract.deleteItem(item.id);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as='div'
        className='relative'>
        <div className='fixed inset-0 bg-black opacity-30 z-5' />
        <Dialog.Panel>
          <div className='h-fit w-1/3 mx-auto px-10 py-8 rounded-lg bg-white z-10 gap-4 flex flex-col text-sm fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
            <Dialog.Title className='flex justify-between items-center'>
              <p className='text-xl italic font-bold'>
                Are you sure you want to delete your item?
              </p>
            </Dialog.Title>
            <Dialog.Description>This is not reversable.</Dialog.Description>
            <div className='space-x-3'>
              <button
                className='px-6 py-3 border hover:shadow-md rounded-lg min-w-[6rem]'
                onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button
                className='px-6 py-3 border hover:shadow-md rounded-lg min-w-[6rem]'
                onClick={() => deleteItem()}>
                {loading ? (
                  <AiOutlineLoading className='animate-spin mx-auto' />
                ) : (
                  'Delete Item'
                )}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
export default DeleteItemModal;
