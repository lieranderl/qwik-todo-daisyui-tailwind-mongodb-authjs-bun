import type { Signal } from "@builder.io/qwik";
import { component$, $, useContext, useVisibleTask$ } from "@builder.io/qwik";
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
import type { TodoBody } from "~/models/todo";
import { ToastManagerContext } from "qwik-toasts";

const TodoAddSchema = object({
  title: string([minLength(1, "Please enter TODO title.")]),
});

type TodoAddForm = Input<typeof TodoAddSchema>;

type TodoAddModalProps = {
  refresh: Signal<number>;
};

const useFormAddAction = formAction$<TodoAddForm, ResponseData>(
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
  const toastManager = useContext(ToastManagerContext);
  const [todoAddForm, { Form, Field }] = useForm<TodoAddForm, ResponseData>({
    loader: {
      value: {
        title: "",
      },
    },
    action: useFormAddAction(),
    validate: valiForm$(TodoAddSchema),
  });

  const resetForm$ = $(() => {
    toastManager.addToast({
      message: todoAddForm.response.message!,
      type: todoAddForm.response.status!,
      autocloseTime: 5000,
    });
    setValue(todoAddForm, "title", "");
    reset(todoAddForm);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    // track todo form response and update refresh signal
    track(() => todoAddForm.response);
    if (todoAddForm.response.status) {
      refresh.value++;
      resetForm$();
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
            <button
              class="btn btn-outline btn-primary btn-sm"
              type="submit"
              disabled={todoAddForm.submitting}
            >
              {todoAddForm.submitting && (
                <span class="loading loading-spinner loading-sm"></span>
              )}
              {todoAddForm.submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
});
