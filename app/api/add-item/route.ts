import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import List from '@/models/List';
import generateEmojiForItem from '@/utils/generateEmoji';

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

    // Generate an emoji for the new item
    const emoji = await generateEmojiForItem(item.text);

    // Add the emoji to the item
    const newItem = {
      ...item,
      emoji,
    };

    // Find the list and add the new item
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $push: { items: newItem } },
      { new: true }
    ).lean();

    if (!updatedList) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Item added successfully', item: newItem },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
