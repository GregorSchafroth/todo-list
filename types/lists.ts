export interface TodoItem {
  id: string;
  emoji: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  emoji: string;
  name: string;
  items: TodoItem[];
}
