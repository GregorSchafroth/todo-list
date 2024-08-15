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
import { TodoList } from '@/types/lists';
import { ArrowRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

interface TodoListProps {
  lists: List[];
}

const ListsTable = ({ lists }: TodoListProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/lists/${id}`);
  };

  return (
    <>
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
            {lists ? (
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
    </>
  );
};

export default ListsTable;
