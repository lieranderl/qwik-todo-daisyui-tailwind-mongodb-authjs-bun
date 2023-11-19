import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { TodoList } from "~/components/todo-page/TodoList";
import { getTodoList } from "~/utils/todomongodb";

export const useTodoListLoader = routeLoader$(async (event) => {
  const session = event.sharedMap.get("session");
  // console.log(session);
  if (session && session.user && session.user.email) {
    return await getTodoList({email: session.user.email});
  } 
  return []
  
})

export default component$(() => {
  return (
    <>
        <TodoList />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
