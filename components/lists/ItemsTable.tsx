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

interface Item {
  id: number;
  emoji: string;
  text: string;
}

interface List {
  _id: number;
  items: Item[];
}

interface ItemsTableProps {
  list: List | null; // List can be null if not found
}

const ItemsTable = ({ list }: ItemsTableProps) => {
  const router = useRouter();

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
                <TableCell key={item.id}>
                  <div className='flex gap-2'>
                    <div>{item.emoji}</div>
                    <div>{item.text}</div>
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

export default ItemsTable;
