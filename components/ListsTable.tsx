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
import { ArrowRightCircle } from 'lucide-react';
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
            <TableHead>Name</TableHead>
            <TableHead>Items</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists && lists.length > 0 ? (
            lists.map((list) => (
              <TableRow
                key={list._id}
                className='cursor-pointer'
                onClick={() => handleRowClick(list._id)}
              >
                <TableCell className='flex gap-2'>
                  <div>{list.emoji}</div>
                  <div>{list.name}</div>
                </TableCell>
                <TableCell>
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
                  <div className='flex justify-end'>
                    <ArrowRightCircle className='text-gray-500 hover:text-gray-400' />
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