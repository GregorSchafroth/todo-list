import BackButton from '@/components/BackButton';
import ItemsTable from '@/components/ItemsTable';
import connectDB from '@/config/database';
import List from '@/models/List'
import AddItem from '@/components/AddItem'

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

interface ListPageProps {
  params: {
    id: string;
  };
}

const ListEditPage = async ({ params }: ListPageProps) => {
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

  const list = lists.find((list) => list._id === params.id) ?? null;

  if (list === null){
    return <div>List not found</div>
  }

  return (
    <div className='m-2 flex flex-col gap-4'>
      <BackButton text='Lists' link='/' />
      <h1 className='font-bold'>{`${list.emoji} ${list.name}`}</h1>
      <ItemsTable list={list} />
      <AddItem id={list._id} />
    </div>
  );
};

export default ListEditPage;
