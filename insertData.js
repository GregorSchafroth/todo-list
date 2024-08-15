import mongoose from 'mongoose';
import dotenv from 'dotenv';
import List from './models/List.js'; // Adjust path if necessary

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  try {
    console.log('Connecting to MongoDB...');
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully.');

    // Create a new list entry
    const newList = new List({
      emoji: '📚',
      name: 'Books to Read',
      items: [
        {
          id: '1',
          emoji: '📖',
          text: 'Read "To Kill a Mockingbird"',
          completed: false,
        },
        { id: '2', emoji: '📘', text: 'Read "1984"', completed: false },
      ],
    });

    // Save the new list to the database
    const savedList = await newList.save();
    console.log('New List saved:', savedList);

    // Close connection
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectDB();
