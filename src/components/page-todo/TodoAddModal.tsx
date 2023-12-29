import type { Signal } from "@builder.io/qwik";
import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import type { ResponseData } from "@modular-forms/qwik";
import {
  formAction$,
  reset,
  setValue,
  useForm,
  valiForm$,
} from "@modular-forms/qwik";
import type { Input } from "valibot";
import { object, string, minLength } from "valibot";
import { addTodo } from "~/utils/todomongodb";
import { toastManagerContext } from "../toast/toast-stack";
import type { TodoBody } from "~/models/todo";

const TodoAddSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
});

type TodoAddForm = Input<typeof TodoAddSchema>;

type TodoAddModalProps = {
  refresh: Signal<number>;
};

const useFormAction = formAction$<TodoAddForm, ResponseData>(
  async (values, event) => {
    const session = event.sharedMap.get("session");
    if (!session) {
      throw new Error("User not logged in");
    }
    const input = {
      email: session.user.email,
      ...values,
    } as TodoBody;
    try {
      const resp = await addTodo(input);
      return {
        status: "success",
        message: "Todo added successfully.",
        data: { id: resp.id },
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to add TODO",
        data: { id: "" },
      };
    }
  },
  valiForm$(TodoAddSchema),
);

export const TodoAddModal = component$(({ refresh }: TodoAddModalProps) => {
  const toastManager = useContext(toastManagerContext);
  const [TodoAddForm, { Form, Field }] = useForm<TodoAddForm, ResponseData>({
    loader: {
      value: {
        title: "",
      },
    },
    action: useFormAction(),
    validate: valiForm$(TodoAddSchema),
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => TodoAddForm.response);
    if (TodoAddForm.response.status === "success") {
      refresh.value += 1;
      toastManager.addToast({
        message: TodoAddForm.response.message!,
        type: TodoAddForm.response.status!,
        autocloseTime: 5000,
      });
      const dialog = document.getElementById(
        "addtodo_modal",
      ) as HTMLDialogElement;
      dialog.close();
      setValue(TodoAddForm, "title", "");
      reset(TodoAddForm);
    } else if (TodoAddForm.response.status === "error") {
      toastManager.addToast({
        message: TodoAddForm.response.message!,
        type: TodoAddForm.response.status!,
        autocloseTime: 5000,
      });
      setValue(TodoAddForm, "title", "");
      reset(TodoAddForm);
    }
  });

  return (
    <dialog id="addtodo_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="pb-4 text-lg font-bold">Add new TODO</h3>
        <Form>
          <Field name="title" type="string">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  autoFocus={true}
                  class="input card-title input-bordered w-full"
                  // placeholder="Type TODO title here"
                  type="text"
                  value={field.value}
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <div class="card-actions justify-end pt-4">
            {!TodoAddForm.submitting && (
              <button
                class="btn btn-outline btn-primary btn-sm"
                type="submit"
                disabled={TodoAddForm.submitting}
              >
                Save
              </button>
            )}
            {TodoAddForm.submitting && (
              <button
                class="btn btn-disabled btn-outline btn-primary btn-sm"
                type="button"
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
