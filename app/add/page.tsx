import ListsTable from '@/components/ListsTable';
import AddList from '@/components/AddList';
import BackButton from '@/components/BackButton';

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
      <BackButton text='Lists' link='/' />
      <h1 className='font-bold'>Todo List</h1>
      <ListsTable />
      <AddList />
    </div>
  );
};

export default HomePage;
