import ListsTable from '@/components/ListsTable';
import PlusButton from '@/components/PlusButton';

interface TodoItem {
  id: string;
  emoji: string;
  text: string;
  completed: boolean;
}

interface TodoList {
  _id: string;
  emoji: string;
  name: string;
  items: TodoItem[];
}

const HomePage = async () => {
  return (
    <div className='m-2 flex flex-col gap-4'>
      <h1 className='font-bold'>Todo List</h1>
      <ListsTable />
      <PlusButton text='Add List' link='/add' />
    </div>
  );
};

export default HomePage;
