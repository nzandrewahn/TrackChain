import { useState } from 'react';
import { BiSolidPencil } from 'react-icons/bi';
import { BsTrash3 } from 'react-icons/bs';
import { LuSendToBack } from 'react-icons/lu';
import DeleteItemModal from './DeleteItemModal';
import TransferItemModal from './TransferItemModal';
import UpdateFormModal from './UpdateFormModal';

const Item: React.FC<{ item: any }> = ({ item }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  return (
    <div className='border w-56 h-64 px-3 py-4 rounded-lg bg-slate-200/20 space-y-2 relative mb-5'>
      <p className='text-xl italic '>{item.title}</p>
      <p className='text-sm'>{item.description}</p>
      <div className='absolute bottom-4 right-4 flex gap-3 items-center'>
        <LuSendToBack
          className='h-6 w-6 cursor-pointer'
          onClick={() => setTransferModalOpen(true)}
        />
        <BiSolidPencil
          className='h-6 w-6 cursor-pointer'
          onClick={() => setUpdateModalOpen(true)}
        />
        <BsTrash3
          className='h-5 w-6 cursor-pointer'
          onClick={() => setDeleteModalOpen(true)}
        />
      </div>
      <UpdateFormModal
        isOpen={updateModalOpen}
        setIsOpen={setUpdateModalOpen}
        item={item}
      />
      <DeleteItemModal
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        item={item}
      />
      <TransferItemModal
        isOpen={transferModalOpen}
        setIsOpen={setTransferModalOpen}
        item={item}
      />
    </div>
  );
};
export default Item;
