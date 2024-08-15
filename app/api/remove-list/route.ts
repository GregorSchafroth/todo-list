import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import List from '@/models/List';


export async function POST(request: Request) {
  try {
    await connectDB();

    const { listId } = await request.json();

    // Remove the list by ID
    const result = await List.findByIdAndDelete(listId);

    if (!result) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'List removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing List:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
