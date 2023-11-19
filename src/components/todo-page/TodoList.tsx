import { component$ } from "@builder.io/qwik";
import { useTodoListLoader } from "~/routes";
import { TodoCard } from "./TodoCard";
import { TodoAddModal } from "./TodoAddModal";

export const TodoList = component$(() => {
  const todoList = useTodoListLoader();
  return (
    <>
      <div class="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
        {todoList.value.map((todo, i) => {
          return <TodoCard todo={todo} key={i} />;
        })}
      </div>
      <TodoAddModal />
    </>
  );
});
