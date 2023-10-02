import Item from './Item';

const ItemGrid: React.FC<{ items: any }> = ({ items }) => {
  return (
    <div className='px-12 flex gap-x-4 flex-wrap'>
      {items.length === 0 && (
        <div className='w-52 h-64 px-2 border rounded-md text-xs text-gray-600 flex justify-center items-center text-center italic'>
          <span>
            Create an item <br /> to get started
          </span>
        </div>
      )}
      {items.map((item: any) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
export default ItemGrid;
