import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { TodoCard } from "./TodoCard";
import { TodoAddModal } from "./TodoAddModal";
import { getTodoList } from "~/utils/todomongodb";
import { useAuthSession } from "~/routes/plugin@auth";
import { server$ } from "@builder.io/qwik-city";

export const TodoList = component$(() => {
  const refreshEvent = useSignal(0);
  const session = useAuthSession();

  const getTodoFromServer = server$(async (email: string) => {
    const todolist = await getTodoList({ email: email });
    // sort by completed
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

  const resource = useResource$(async ({ track }) => {
    track(() => refreshEvent.value);

    if (!session.value?.user?.email) {
      throw new Error("User not logged in");
    }
    return await getTodoFromServer(session.value.user.email);
  });

  return (
    <>
      <Resource
        value={resource}
        onPending={() => (
          <>
            <span class="loading loading-spinner loading-sm"></span> Updating...
          </>
        )}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(todoList) => (
          <>
            <div class="grid lg:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-4 sm:mx-40 lg:mx-24 xl:mx-40 mx-2">
              {todoList.map((todo, i) => {
                return <TodoCard todo={todo} key={i} refresh={refreshEvent} />;
              })}
            </div>
          </>
        )}
      />
      <TodoAddModal refresh={refreshEvent} />
    </>
  );
});
