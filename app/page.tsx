import { Button } from "@/components/ui/button";
import ListsTable from '@/components/lists/ListsTable'

export default function Home() {
  return (
   <div className="m-2 flex flex-col gap-2">
    <strong>Todo List</strong>
    <ListsTable />
   </div>
  );
}
