'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import lists from '@/data/lists';
import { TodoList } from '@/types/lists';
import { useRouter } from 'next/navigation';

interface TodoListProps {
  name?: string;
}

const ListsTable = ({ name }: TodoListProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/lists/${id}/edit`);
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.map((list) => (
            <TableRow key={list.id} onClick={() => handleRowClick(list.id)}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListsTable;
