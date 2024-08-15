import { Schema, model, models } from 'mongoose';

// Define the schema for the items array
const ItemSchema = new Schema({
  id: String,
  emoji: String,
  text: String,
  completed: Boolean,
});


// Define the main List schema
const ListSchema = new Schema({
  emoji: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  items: [ItemSchema],
});

// Create the model from the schema
const List = models.List || model('List', ListSchema);

export default List;
