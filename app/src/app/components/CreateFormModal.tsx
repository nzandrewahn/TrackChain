'use client';
import { Dialog } from '@headlessui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import TrackChainABI from '../../../../server/out/TrackChain.sol/TrackChain.json';

const CreateFormModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });

  const createItem = async (title: string, description: string) => {
    setLoading(true);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      TrackChainABI.abi,
      signer
    );
    const tx = await contract.createItem(title, description, {
      gasLimit: 300000,
      value: ethers.parseEther('0.005'),
    });
    const txReceipt = await tx.wait();
    setLoading(false);

    if (txReceipt.status === 0) {
      console.log('Gas used: ' + txReceipt.gasUsed.toString());
      console.error('Transaction failed. Reason: ' + txReceipt.status);
      throw new Error('Transaction failed: ' + txReceipt.status);
      // display some error message to user
    }

    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      as='div'
      className='relative'>
      <div className='fixed inset-0 bg-black opacity-30 z-5' />
      <Dialog.Panel>
        <div className='h-fit w-1/2 mx-auto px-10 py-8 rounded-lg bg-white z-10 gap-3 flex flex-col text-sm fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
          <Dialog.Title className='flex justify-between items-center'>
            <p className='text-xl italic font-bold'>
              Create a new item on chain
            </p>
            <span>x</span>
          </Dialog.Title>
          <Dialog.Description>
            Create an item that you want to track on chain ⛓️
          </Dialog.Description>

          {/* Create form component  */}
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const { title, description } = formData;
              await createItem(title, description);
            }}
            className='space-y-3'>
            <div>
              <label htmlFor='title' className='block mb-2'></label>
              <input
                id='title'
                type='text'
                placeholder='Enter Item Name'
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                name='title'
                className='border p-1 rounded-sm'
              />
            </div>
            <div>
              <label htmlFor='description' className='block mb-2'></label>
              <textarea
                className='border p-3 rounded-sm'
                id='description'
                name='description'
                placeholder='Enter Item Description'
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                cols={40}
                rows={10}
              />
            </div>

            <div>
              <button
                className='px-6 py-3 border hover:shadow-md rounded-lg min-w-[6rem]'
                type='submit'>
                {loading ? (
                  <AiOutlineLoading className='animate-spin mx-auto' />
                ) : (
                  'Create Item'
                )}
              </button>
            </div>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
export default CreateFormModal;
