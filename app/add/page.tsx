import ListsTable from '@/components/ListsTable';
import connectDB from '@/config/database';
import List from '@/models/List';
import AddList from '@/components/AddList';

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
  await connectDB();

  // Fetch the lists from the database
  const listsFromDB = await List.find({}).lean();

  // Convert each item to a plain JavaScript object
  const lists: TodoList[] = listsFromDB.map((list: any) => ({
    _id: list._id.toString(),
    emoji: list.emoji,
    name: list.name,
    items: list.items.map((item: any) => ({
      id: item.id,
      emoji: item.emoji,
      text: item.text,
      completed: item.completed,
    })),
  }));

  return (
    <div className='m-2 flex flex-col gap-4'>
      <h1 className='font-bold'>Todo List</h1>
      <ListsTable lists={lists} />
      <AddList />
    </div>
  );
};

export default HomePage;
