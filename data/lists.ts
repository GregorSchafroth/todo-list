import { TodoList } from "@/types/lists";

const todoLists: TodoList[] = [
  {
    id: 1,
    emoji: "🛒",
    name: "Groceries",
    items: [
      { id: 1, emoji: "🥛", text: "Buy milk", completed: false },
      { id: 2, emoji: "🥖", text: "Buy bread", completed: true },
    ],
  },
  {
    id: 2,
    emoji: "💼",
    name: "Work tasks",
    items: [
      { id: 1, emoji: "📑", text: "Finish report", completed: false },
      { id: 2, emoji: "📧", text: "Email client", completed: true },
    ],
  },
];

export default todoLists