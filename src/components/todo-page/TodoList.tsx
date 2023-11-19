import { component$ } from "@builder.io/qwik";
import { useTodoListLoader } from "~/routes";
import { TodoCard } from "./TodoCard";



export const TodoList = component$(() => {

    const todoList = useTodoListLoader();
    console.log(todoList.value);

  return <>
    <div class="flex flex-wrap gap-4 justify-center items-center lg:justify-start">
        {todoList.value.map((todo, i) => {
            return <TodoCard todo={todo} key={i}/>
        })}

    </div>
  </>
});