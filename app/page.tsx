import ListsTable from '@/components/lists/ListsTable';
import connectDB from '@/config/database'
import List from '@/models/List';
import PlusButton from '@/components/PlusButton';
import lists from '@/data/TodoLists.json';

const HomePage = async () => {
  await connectDB();
  const mongoLists = await List.find({}).lean();

  console.log('lists', lists)
  console.log('mongoLists', mongoLists )

  return (
    <div className='m-2 flex flex-col gap-2'>
      <strong>Todo List</strong>
      <ListsTable lists={lists} />
      <PlusButton text='Add List' link='#' />
    </div>
  )
}

export default HomePage