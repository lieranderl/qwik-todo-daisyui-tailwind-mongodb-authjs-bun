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
    return await getTodoList({ email: email });
  });

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
      onPending={() => (
        <>
          <span class="loading loading-spinner loading-sm"></span> Updating...
        </>
      )}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(todoList) => (
        <>
          <div class="flex flex-wrap items-center justify-center gap-4 lg:justify-start mx-4 sm:mx-16">
            {todoList.map((todo, i) => {
              return <TodoCard todo={todo} key={i} refresh={refreshEvent} />;
            })}
          </div>
          <TodoAddModal refresh={refreshEvent} />
        </>
      )}
    />
  );
});
