import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import List from '@/models/List';

interface AddItemRequestBody {
  listId: string;
  item: {
    id: string;
    emoji: string;
    text: string;
    completed: boolean;
  };
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { listId, item }: AddItemRequestBody = await request.json();

    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $push: { items: item } },
      { new: true }
    ).lean();

    if (!updatedList) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    return NextResponse.json(updatedList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
