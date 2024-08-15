import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import List from '@/models/List';

export async function GET() {
  try {
    await connectDB();
    const listsFromDB = await List.find({}).lean();

    const lists = listsFromDB.map((list: any) => ({
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

    return NextResponse.json(lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
