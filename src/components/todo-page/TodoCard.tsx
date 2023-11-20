import type { QRL, Signal } from "@builder.io/qwik";
import { component$, $, useSignal, useContext } from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { getValue, useForm, valiForm$ } from "@modular-forms/qwik";
import type { Todo } from "~/models/todo";
import { type Input, minLength, object, string, boolean } from "valibot";
import { deleteTodo, updateTodo } from "~/utils/todomongodb";
import { server$ } from "@builder.io/qwik-city";
import { toastManagerContext } from "../toast/toastStack";

type TodoCardProps = {
  todo: Todo;
  refresh: Signal<number>;
};
const TodoUpdateSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
  completed: boolean(),
});
type TodoForm = Input<typeof TodoUpdateSchema>;

export const TodoCard = component$<TodoCardProps>(({ todo, refresh }) => {
  const [TodoForm, { Form, Field }] = useForm<TodoForm>({
    loader: {
      value: { title: todo.title, completed: todo.completed },
    },
    validate: valiForm$(TodoUpdateSchema),
  });

  const toastManager = useContext(toastManagerContext);
  const isLoadingDelete = useSignal(false);
  const isLoadingUpdate = useSignal(false);
  const disabledSavebutton = useSignal(true);

  const updateTodoOnServer = server$(async (values) => {
    await updateTodo({
      id: todo.id,
      todo: {
        title: values.title,
        completed: values.completed,
      },
    });
  });

  const submitHandlerUpdate: QRL<SubmitHandler<TodoForm>> = $(
    async (values, event) => {
      if (TodoForm.invalid) {
        return;
      }
      isLoadingUpdate.value = true;
      try {
        await updateTodoOnServer(values);
        toastManager.addToast({
          message: "TODO Updated",
          type: "success",
          autocloseTime: 5000,
        });
        refresh.value += 1;
      } catch (error) {
        toastManager.addToast({
          message: "Failed to update TODO",
          type: "error",
          autocloseTime: 5000,
        });
      }
    },
  );

  const deleleTodoOnServer = server$(async () => {
    await deleteTodo({
      id: todo.id,
    });
  });

  const submitHandlerDelete = $(async () => {
    isLoadingDelete.value = true;
    try {
      await deleleTodoOnServer();
      toastManager.addToast({
        message: "TODO deleted",
        type: "success",
        autocloseTime: 5000,
      });
      // window.location.reload();
      refresh.value += 1;
    } catch (error) {
      toastManager.addToast({
        message: "Failed to delete TODO",
        type: "error",
        autocloseTime: 5000,
      });
    }
  });

  const handleInputChange = $(async () => {
    disabledSavebutton.value = false;
  });

  return (
    <div class="card card-bordered  min-w-[400px] shadow-lg">
      <div class="card-body">
        <Form onSubmit$={submitHandlerUpdate}>
          <Field name="title" type="string">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  class={
                    getValue(TodoForm, "completed")
                      ? "input card-title line-through"
                      : "input card-title"
                  }
                  placeholder="Type TODO title here"
                  type="text"
                  value={field.value}
                  onClick$={handleInputChange}
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          {todo.createdAt && (
            <div class="flex flex-col py-4 text-right text-sm">
              <span>Created: {todo.createdAt.toLocaleString("en-GB")}</span>
              <span>Updated: {todo.updatedAt.toLocaleString("en-GB")}</span>
            </div>
          )}
          <div class="flex justify-end py-2">
            <label class="label w-fit cursor-pointer">
              <span class="label-text mx-4">Completed</span>
              <Field name="completed" type="boolean">
                {(field, props) => (
                  <input
                    {...props}
                    type="checkbox"
                    class="checkbox"
                    checked={field.value}
                    onChange$={handleInputChange}
                  />
                )}
              </Field>
            </label>
          </div>

          <div class="card-actions justify-end">
            {!isLoadingUpdate.value && (
              <button
                class={
                  disabledSavebutton.value
                    ? "btn btn-disabled btn-outline btn-primary btn-sm"
                    : "btn btn-outline btn-primary btn-sm"
                }
                type="submit"
              >
                Save
              </button>
            )}
            {isLoadingUpdate.value && (
              <button
                class="btn btn-disabled btn-outline btn-primary btn-sm"
                type="submit"
              >
                <span class="loading loading-spinner loading-sm"></span>
                Saving...
              </button>
            )}

            {!isLoadingDelete.value && (
              <button
                class="btn btn-outline btn-error btn-sm"
                type="button"
                onClick$={submitHandlerDelete}
              >
                Delete
              </button>
            )}
            {isLoadingDelete.value && (
              <button
                class="btn btn-disabled btn-outline btn-error btn-sm"
                type="button"
              >
                <span class="loading loading-spinner loading-sm"></span>
                Deleting...
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
});
