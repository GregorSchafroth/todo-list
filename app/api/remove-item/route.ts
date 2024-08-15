import { NextResponse } from 'next/server';
import connectDB from '@/config/database'; // Your database connection file
import List from '@/models/List'; // Your List model

export async function POST(request: Request) {
  try {
    await connectDB(); // Connect to the database

    const { listId, itemId } = await request.json();

    // Find the list by ID and update it by removing the item with itemId
    const list = await List.findById(listId);

    if (!list) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    list.items = list.items.filter((item: any) => item.id !== itemId);
    await list.save();

    return NextResponse.json(
      { message: 'Item removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing item:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
