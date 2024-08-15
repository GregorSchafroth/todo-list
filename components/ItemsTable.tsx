'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import lists from '@/data/TodoLists.json';
import { useRouter } from 'next/navigation';
import { CircleMinus } from 'lucide-react';
import { useState } from 'react';

interface Item {
  id: string;
  emoji: string;
  text: string;
  completed: boolean;
}

interface List {
  _id: string;
  emoji: string;
  name: string;
  items: Item[];
}

interface ItemsTableProps {
  list: List | null;
}

const ItemsTable = ({ list }: ItemsTableProps) => {
  const [items, setItems] = useState<Item[]>(list ? list.items : []);
  const router = useRouter();

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Update the state locally to remove the item
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);

      // Send a request to the backend to remove the item from the database
      const response = await fetch('/api/remove-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: list?._id,
          itemId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      // Optionally, refresh the page to get the latest data
      router.refresh();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list && list.items.length > 0 ? (
            list.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className='flex gap-2'>
                    <div>{item.emoji}</div>
                    <div>{item.text}</div>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end'>
                    <CircleMinus className='text-red-500 hover:text-red-400 cursor-pointer' onClick={() => handleRemoveItem(item.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='text-gray-400 italic'>No items found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
