import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { TodoList } from "~/components/page-todo/todo-list";

export default component$(() => {
  return <TodoList />;
});

export const head: DocumentHead = {
  title: "TODO app",
  meta: [
    {
      name: "TODO app",
      content: "TODO app",
    },
  ],
};
