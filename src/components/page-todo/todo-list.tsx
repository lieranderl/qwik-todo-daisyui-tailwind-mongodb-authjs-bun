import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { TodoCard } from "./todo-card";
import { TodoAddModal } from "./todo-add-modal";
import { getTodoList } from "~/utils/todomongodb";
import { useAuthSession } from "~/routes/plugin@auth";
import { server$ } from "@builder.io/qwik-city";
import { pendingHandler, errorHandler } from "~/utils/resource-handlers";

const getTodoFromServer = server$(async (email: string) => {
  const todolist = await getTodoList({ email: email });
  // sort todolist by completed
  todolist.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      return 0;
    }
  });
  return todolist;
});

export const TodoList = component$(() => {
  const refreshEvent = useSignal(0);
  const session = useAuthSession();

  const resource = useResource$(async ({ track }) => {
    track(() => refreshEvent.value);
    if (!session.value?.user?.email) {
      throw new Error("User not logged in");
    }
    return await getTodoFromServer(session.value.user.email);
  });

  return (
    <Resource
      value={resource}
      onPending={pendingHandler}
      onRejected={errorHandler}
      onResolved={(todoList) => (
        <div class="mx-2 grid justify-items-center gap-4 sm:mx-40 lg:mx-24 lg:grid-cols-2 xl:mx-40 2xl:grid-cols-3">
          {todoList.map((todo) => {
            return (
              <TodoCard todo={todo} key={todo.id} refresh={refreshEvent} />
            );
          })}
          <TodoAddModal refresh={refreshEvent} />
        </div>
      )}
    />
  );
});
