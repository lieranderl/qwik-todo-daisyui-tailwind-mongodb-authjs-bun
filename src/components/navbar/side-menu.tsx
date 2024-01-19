import { component$ } from "@builder.io/qwik";
import { TodoAdd } from "../page-todo/todo-add-button";

export const SideMenu = component$(() => {
  return (
    <li>
      <TodoAdd />
    </li>
  );
});
