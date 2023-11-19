import type { Todo, TodoBodyRecordProps, TodoId, TodoList, TodoListBodyRecordProps } from "~/models/todo";
import mongoClientPromise from "./mongodbinit";

export const addTodo = async ({email, todo}:TodoBodyRecordProps) => {
    const mongodb = await mongoClientPromise;
    const todosCol = mongodb.db("testing").collection("todos");
    const todoId = await todosCol.insertOne({email, todo});
    return {id: todoId.insertedId.toString()} as TodoId;
};
export const getTodoList = async ({email}: TodoListBodyRecordProps ) => {
    const mongodb = await mongoClientPromise;
    const todosCol = mongodb.db("testing").collection("todos");
    const cursor = todosCol.find({email});
    const todoList: TodoList = [];
    for await (const todo of cursor) {
        const { _id, ...mytodo} = todo;
        mytodo.id = todo._id.toString();
        todoList.push(mytodo as Todo);
    }
    return todoList;
};