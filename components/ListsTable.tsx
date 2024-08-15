'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRightCircle, CircleMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Item {
  id: string;
  emoji: string;
  text: string;
}

interface List {
  _id: string;
  name: string;
  emoji: string;
  items: Item[];
}

const ListsTable = () => {
  const [lists, setLists] = useState<List[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-lists'); // Adjust this endpoint based on your setup
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setLists(data);
      } catch (error) {
        setError('Failed to load lists');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once when the component mounts

  const handleRemoveList = async (listId: string) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      'Are you sure you want to remove this list? This action cannot be undone.'
    );

    if (!isConfirmed) {
      return; // If user cancels, exit the function
    }

    try {
      // Update the state locally to remove the list
      if (lists) {
        const updatedLists = lists.filter((list) => list._id !== listId);
        setLists(updatedLists);

        // Send a request to the backend to remove the list from the database
        const response = await fetch('/api/remove-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listId: listId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to remove list');
        }

        // Optionally, refresh the page to get the latest data
        router.refresh();
      }
    } catch (error) {
      console.error('Error removing list:', error);
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/lists/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-2/5'>Name</TableHead>
            <TableHead>Items</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists && lists.length > 0 ? (
            lists.map((list) => (
              <TableRow key={list._id}>
                <TableCell className='relative'>
                  <div
                    className='absolute inset-0 flex items-center gap-2 cursor-pointer pl-4 truncate'
                    onClick={() => handleRowClick(list._id)}
                  >
                    <div>{list.emoji}</div>
                    <div>{list.name}</div>
                  </div>
                </TableCell>
                <TableCell
                  className='cursor-pointer'
                  onClick={() => handleRowClick(list._id)}
                >
                  {list.items.map((item) => (
                    <div key={item.id}>
                      <div className='flex gap-2'>
                        <div>{item.emoji}</div>
                        <div>{item.text}</div>
                      </div>
                    </div>
                  ))}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-10'>
                    <CircleMinus
                      className='text-red-500 hover:text-red-400 cursor-pointer'
                      onClick={() => handleRemoveList(list._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No items found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListsTable;
