export interface TodoItem {
  id: number;
  emoji: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: number;
  emoji: string;
  name: string;
  items: TodoItem[];
}
