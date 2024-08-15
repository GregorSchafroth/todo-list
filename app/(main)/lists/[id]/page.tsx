import BackButton from '@/components/BackButton';
import PlusButton from '@/components/PlusButton';
import ItemsTable from '@/components/lists/ItemsTable';
import connectDB from '@/config/database';
import List from '@/models/List'

interface ListPageProps {
  params: {
    id: number;
  };
}

const ListEditPage = async ({ params }: ListPageProps) => {
  await connectDB();
  const lists = await List.find({}).lean()
  const list = lists.find((list) => list._id === Number(params.id));

  return (
    <div className='m-2 flex flex-col gap-2'>
      <BackButton text='Lists' link='/' />
      {/* <ItemsTable list={list} /> */}
      <PlusButton text='Add Reminder' link='#' />
    </div>
  );
};

export default ListEditPage;
