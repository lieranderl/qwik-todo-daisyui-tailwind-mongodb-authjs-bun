import { component$, $, useSignal } from "@builder.io/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import type { Todo } from "~/models/todo";
import { type Input, minLength, object, string, boolean } from "valibot";
import { deleteTodo, updateTodo } from "~/utils/todomongodb";
import { server$, useNavigate } from "@builder.io/qwik-city";

type TodoCardProps = {
  todo: Todo;
};
const TodoUpdateSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
  completed: boolean(),
  id: string(),
});
type TodoForm = Input<typeof TodoUpdateSchema>;

export const useFormAction = formAction$<TodoForm>(async (values) => {
  // Runs on server
  // console.log("Saving todo", values);
  updateTodo({
    id: values.id,
    todo: {
      title: values.title,
      completed: values.completed,
    },
  });
}, valiForm$(TodoUpdateSchema));

export const TodoCard = component$<TodoCardProps>(({ todo }) => {
  const nav = useNavigate();
  const [TodoForm, { Form, Field }] = useForm<TodoForm>({
    loader: {
      value: { title: todo.title, completed: todo.completed, id: todo.id },
    },
    action: useFormAction(),
    validate: valiForm$(TodoUpdateSchema),
  });

  const deleleHandler = server$(async () => {
    await deleteTodo({
      id: todo.id,
    });
  });

  const isLoading = useSignal(false);

  const disabledbutton = useSignal(" btn-disabled");

  const submitHandler = $(() => {
    disabledbutton.value = " btn-disabled";
  });

  const handleInputChange = $(async () => {
    disabledbutton.value = "";
  });

  return (
    <div class="card card-bordered  min-w-[400px] shadow-lg">
      <div class="card-body">
        <Form onSubmit$={submitHandler}>
          <Field name="title" type="string">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  class="input card-title"
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
          <Field name="id" type="string">
            {(field, props) => (
              <input {...props} type="hidden" value={field.value} />
            )}
          </Field>

          <div class="card-actions justify-end">
            <button
              class={
                "btn btn-outline btn-primary btn-sm" + disabledbutton.value
              }
              type="submit"
            >
              Save
            </button>
            {!isLoading.value && (
              <button
                class="btn btn-outline btn-error btn-sm"
                type="button"
                onClick$={async () => {
                  isLoading.value = true;
                  await deleleHandler();
                  window.location.reload();
                }}
              >
                Delete
              </button>
            )}
            {isLoading.value && (
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
