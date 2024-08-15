import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import List from '@/models/List';
import generateEmojiForItem from '@/utils/generateEmoji';

interface AddListRequestBody {
  name: string;
  emoji?: string;
  items: [];
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, emoji, items }: AddListRequestBody = await request.json();

    // Generate an emoji for the list name if not provided
    const generatedEmoji = emoji || (await generateEmojiForItem(name));

    // Create the new list
    const newList = new List({
      name,
      emoji: generatedEmoji,
      items,
    });

    await newList.save();

    return NextResponse.json(
      { message: 'List created successfully', list: newList },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating list:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
