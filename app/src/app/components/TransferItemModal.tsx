import { Dialog } from '@headlessui/react';
import { Contract, ethers } from 'ethers';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import TrackChainABI from '../../../../server/out/TrackChain.sol/TrackChain.json';
import { ItemResponse } from '../types/generated/trackchain-contract';

const TransferItemModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  item: ItemResponse;
}> = ({ isOpen, setIsOpen, item }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  });
  const transferItem = async () => {
    // setLoading(true);
    const { address } = formData;
    console.log('Transfer Item', address);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      TrackChainABI.abi,
      signer
    ) as Contract;
    contract.transferItem(item.id, address);
    setIsOpen(false);
    setLoading(false);
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
          <div className='h-fit w-1/3 mx-auto px-10 py-8 rounded-lg bg-white z-10 gap-2 flex flex-col text-sm fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
            <Dialog.Title className='flex justify-between items-center'>
              <p className='text-xl italic font-bold'>Transfer Item</p>
            </Dialog.Title>
            <Dialog.Description>Select transfer options</Dialog.Description>
            {/* 
            - Address of user to transfer to
            */}
            <form
              className='space-y-5 mt-3'
              onSubmit={(e) => {
                e.preventDefault();
                transferItem();
              }}>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Address to transfer to:
                </label>
                <input
                  type='text'
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className='mt-1 block w-full border-gray-600 rounded-sm shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div className='space-x-3'>
                <button
                  className='px-6 py-3 border hover:shadow-md rounded-lg min-w-[6rem]'
                  onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className='px-6 py-3 border hover:shadow-md rounded-lg min-w-[6rem]'
                  type='submit'>
                  {loading ? (
                    <AiOutlineLoading className='animate-spin mx-auto' />
                  ) : (
                    'Transfer Item'
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
export default TransferItemModal;
