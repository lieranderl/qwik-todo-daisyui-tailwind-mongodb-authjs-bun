import { component$ } from "@builder.io/qwik";
import type { Todo } from "~/models/todo";

type TodoCardProps = {
  todo: Todo;
};

export const TodoCard = component$<TodoCardProps>(({ todo }) => {
  return (
    <div class="card card-bordered  min-w-[400px] shadow-lg">
      <div class="card-body">
        <div class="form-control">
          <input
            class="input card-title"
            type="text"
            placeholder="Type here"
            value={todo.title}
          />
          <div class="flex flex-col text-right text-sm py-4">
            <span>Created: {todo.createdAt.toLocaleString("en-GB")}</span>
            <span>Updated: {todo.updatedAt.toLocaleString("en-GB")}</span>
          </div>

          <div class="flex justify-end py-2">
            <label class="label w-fit cursor-pointer">
              <span class="label-text mx-4">Completed</span>
              <input type="checkbox" class="checkbox" />
            </label>
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-outline btn-primary btn-sm" type="submit">Save</button>
            <button class="btn btn-outline btn-error  btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
});
