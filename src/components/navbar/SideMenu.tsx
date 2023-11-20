import { component$ } from "@builder.io/qwik";
import { TodoAdd } from "../page-todo/TodoAdd";

export const SideMenu = component$(() => {
  return (
    <>
      <li>
        <TodoAdd />
      </li>
    </>
  );
});
