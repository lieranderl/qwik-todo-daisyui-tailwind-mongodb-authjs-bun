import type { QRL } from "@builder.io/qwik";
import { component$, $, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import type { SubmitHandler } from "@modular-forms/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import type { Input } from "valibot";
import { object, string, minLength } from "valibot";
import { useAuthSession } from "~/routes/plugin@auth";
import { addTodo } from "~/utils/todomongodb";

const TodoAddSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
});

type TodoAddForm = Input<typeof TodoAddSchema>;

export const TodoAddModal = component$(() => {
  const session = useAuthSession();
  const isLoading = useSignal(false);
  const [TodoAddForm, { Form, Field }] = useForm<TodoAddForm>({
    loader: {
      value: {
        title: "",
      },
    },
    validate: valiForm$(TodoAddSchema),
  });

  const addTodoOnServer = server$(async (values) => {
    await addTodo(values);
  });

  const handleSubmit: QRL<SubmitHandler<TodoAddForm>> = $(
    async (values, event) => {
      if (TodoAddForm.invalid) {
        return;
      }
      isLoading.value = true;
      const v = {
        email: session.value?.user?.email,
        ...values
      }
      await addTodoOnServer(v);
      window.location.reload();
    },
  );

  return (
    <dialog id="addtodo_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="pb-4 text-lg font-bold">Add new TODO</h3>
        <Form onSubmit$={handleSubmit}>
          <Field name="title" type="string">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  class="input card-title input-bordered w-full"
                  //   placeholder="Type TODO title here"
                  type="text"
                  value={field.value}
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <div class="card-actions justify-end pt-4">
            {!isLoading.value && (
              <button
                class={
                  TodoAddForm.invalid
                    ? "btn btn-disabled btn-outline btn-primary btn-sm"
                    : "btn btn-outline btn-primary btn-sm"
                }
                type="submit"
              >
                Save
              </button>
            )}
            {isLoading.value && (
              <button
                class="btn btn-disabled btn-outline btn-primary btn-sm"
                type="submit"
              >
                <span class="loading loading-spinner loading-sm"></span>
                Saving...
              </button>
            )}
          </div>
        </Form>
      </div>
    </dialog>
  );
});
