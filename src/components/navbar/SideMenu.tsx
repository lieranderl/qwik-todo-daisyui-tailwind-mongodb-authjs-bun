import { component$ } from "@builder.io/qwik";
import { TodoAdd } from "../todo-page/TodoAdd";

export const SideMenu = component$(() => {
  return (
    <>
      <li>
        <TodoAdd />
      </li>
    </>
  );
});
