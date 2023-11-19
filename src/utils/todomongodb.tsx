import type {
  Todo,
  TodoBodyRecordProps,
  TodoId,
  TodoList,
  TodoListBodyRecordProps,
} from "~/models/todo";
import { todosCol } from "./mongodbinit";
import { ObjectId } from "mongodb";

export const addTodo = async ({ id, todo }: TodoBodyRecordProps) => {
  const res = await todosCol.insertOne({ id, todo });
  return { id: res.insertedId.toString() } as TodoId;
};
export const updateTodo = async ({ id, todo }: TodoBodyRecordProps) => {
  const res = await todosCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...todo, updatedAt: new Date() } },
  );
  if (res.modifiedCount === 0) {
    throw new Error("Todo not found");
  }
  return { id } as TodoId;
};
export const deleteTodo = async ({ id }: TodoId) => {
  const res = await todosCol.deleteOne({ _id: new ObjectId(id) });
  if (res.deletedCount === 0) {
    throw new Error("Todo not found");
  }
  return { id } as TodoId;
};

export const getTodoList = async ({ email }: TodoListBodyRecordProps) => {
  const cursor = todosCol.find({ email });
  const todoList: TodoList = [];
  for await (const todo of cursor) {
    const { _id, ...mytodo } = todo;
    mytodo.id = todo._id.toString();
    todoList.push(mytodo as Todo);
  }
  return todoList;
};
