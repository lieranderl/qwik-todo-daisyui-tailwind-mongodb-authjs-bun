import type { Signal } from "@builder.io/qwik";
import {
  component$,
  $,
  useSignal,
  useContext,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { ResponseData } from "@modular-forms/qwik";
import { formAction$, getValue, useForm, valiForm$ } from "@modular-forms/qwik";
import type { Todo } from "~/models/todo";
import { type Input, minLength, object, string, boolean } from "valibot";
import { deleteTodo, updateTodo } from "~/utils/todomongodb";
import { server$ } from "@builder.io/qwik-city";
import { ToastManagerContext } from "qwik-toasts";

type TodoCardProps = {
  todo: Todo;
  refresh: Signal<number>;
};

const TodoUpdateSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
  completed: boolean(),
  id: string(),
});
type TodoForm = Input<typeof TodoUpdateSchema>;

const useFormUpdateAction = formAction$<TodoForm, ResponseData>(
  async (values, event) => {
    const session = event.sharedMap.get("session");
    if (!session) {
      throw new Error("User not logged in");
    }
    try {
      const resp = await updateTodo({
        id: values.id,
        todo: {
          title: values.title,
          completed: values.completed,
        },
      });
      return {
        status: "success",
        message: "Todo added successfully.",
        data: { id: resp.id },
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to update TODO",
        data: { id: "" },
      };
    }
  },
  valiForm$(TodoUpdateSchema),
);

export const TodoCard = component$<TodoCardProps>(({ todo, refresh }) => {
  const [TodoForm, { Form, Field }] = useForm<TodoForm, ResponseData>({
    loader: {
      value: { title: todo.title, completed: todo.completed, id: todo.id },
    },
    validate: valiForm$(TodoUpdateSchema),
    action: useFormUpdateAction(),
  });
  const toastManager = useContext(ToastManagerContext);
  const isLoadingDelete = useSignal(false);
  const disabledSavebutton = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => TodoForm.response);
    if (TodoForm.response.status) {
      refresh.value++;
      toastManager.addToast({
        message: TodoForm.response.message!,
        type: TodoForm.response.status!,
        autocloseTime: 5000,
      });
    }
  });

  const deleleTodoOnServer$ = server$(async () => {
    await deleteTodo({
      id: todo.id,
    });
  });

  const submitHandlerDelete$ = $(async () => {
    isLoadingDelete.value = true;
    try {
      await deleleTodoOnServer$();
      toastManager.addToast({
        message: "TODO deleted",
        type: "success",
        autocloseTime: 5000,
      });
      refresh.value++;
    } catch (error) {
      toastManager.addToast({
        message: "Failed to delete TODO",
        type: "error",
        autocloseTime: 5000,
      });
    }
  });

  const handleInputChange$ = $(async () => {
    disabledSavebutton.value = false;
  });

  return (
    <div class="card card-bordered min-w-[400px] max-w-[500px] shadow-lg">
      <div class="card-body">
        <Form>
          <Field name="id" type="string">
            {(_, props) => <input {...props} type="hidden" />}
          </Field>
          <Field name="title" type="string">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  class={
                    getValue(TodoForm, "completed")
                      ? "input card-title w-full line-through"
                      : "input card-title w-full"
                  }
                  placeholder="Type TODO title here"
                  type="text"
                  value={field.value}
                  onClick$={handleInputChange$}
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <div class="divider"></div>
          <div class="flex items-center justify-between py-2">
            {todo.createdAt && (
              <div>
                <div class="flex items-center justify-end text-sm">
                  <span class="px-1">Updated:</span>
                  <span class="badge badge-sm">
                    {todo.updatedAt.toLocaleString("en-GB")}
                  </span>
                </div>
                <div class="flex items-center justify-end text-sm">
                  <span class="px-1">Created:</span>
                  <span class="badge badge-sm">
                    {todo.createdAt.toLocaleString("en-GB")}
                  </span>
                </div>
              </div>
            )}
            <label class="label w-fit cursor-pointer">
              <Field name="completed" type="boolean">
                {(field, props) => (
                  <div class="flex flex-row-reverse">
                    <input
                      {...props}
                      type="checkbox"
                      class="peer checkbox-info checkbox checked:checkbox-success"
                      checked={field.value}
                      onChange$={handleInputChange$}
                    />
                    <span class="label-text mx-4 hidden text-success peer-checked:block">
                      Completed
                    </span>
                    <span class="label-text mx-4 text-info peer-checked:hidden">
                      Active
                    </span>
                  </div>
                )}
              </Field>
            </label>
          </div>

          <div class="card-actions justify-end">
            {!TodoForm.submitting && (
              <button
                class="btn btn-outline btn-primary btn-sm"
                type="submit"
                disabled={disabledSavebutton.value}
              >
                Save
              </button>
            )}
            {TodoForm.submitting && (
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
                onClick$={submitHandlerDelete$}
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
