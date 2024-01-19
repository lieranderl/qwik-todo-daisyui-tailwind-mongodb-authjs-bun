export type TodoList = Todo[];

export type TodoBody = {
  title: string;
  completed?: boolean;
  email?: string;
};

export type TodoId = {
  id: string;
};

export type TodoTimestamps = {
  createdAt: number;
  updatedAt: number;
};

export type Todo = TodoId & TodoBody & TodoTimestamps;

export type TodoBodyRecordProps = {
  todo: TodoBody;
  id: string;
};

export type TodoListBodyRecordProps = {
  email: string;
};
