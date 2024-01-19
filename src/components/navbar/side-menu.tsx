import { component$ } from "@builder.io/qwik";
import { TodoAdd } from "../page-todo/TodoAddButton";

export const SideMenu = component$(() => {
  return (
      <li>
        <TodoAdd />
      </li>
  );
});
