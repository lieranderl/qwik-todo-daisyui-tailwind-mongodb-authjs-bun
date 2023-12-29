import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ToastBody } from "./toast-stack";
import { getIconByType } from "./utils";
import { HiXMarkSolid } from "@qwikest/icons/heroicons";

export type ToastBodyComponentProps = {
  closeToast: PropFunction;
} & ToastBody;

export const ToastBodyComponent = component$(
  ({ message, type, closeToast }: ToastBodyComponentProps) => {
    const classAlert = useSignal("");

    useTask$(() => {
      if (type === "info")
        classAlert.value = "flex items-center justify-between alert alert-info";
      if (type === "success")
        classAlert.value =
          "flex items-center justify-between alert alert-success";
      if (type === "warning")
        classAlert.value =
          "flex items-center justify-between alert alert-warning";
      if (type === "error")
        classAlert.value =
          "flex items-center justify-between alert alert-error";
    });

    return (
      <div id="toast" class={classAlert} role="alert">
        <div class="flex items-center">
          <div class="me-2 h-6 w-6">{getIconByType(type)}</div>

          <div class="mx-2 overflow-auto whitespace-normal text-sm">
            {message}
          </div>
        </div>

        <button
          type="button"
          class="rounded-lg p-1 text-sm focus:outline-none focus:ring-0"
          aria-label="Close"
          // eslint-disable-next-line qwik/valid-lexical-scope
          onClick$={closeToast}
        >
          <HiXMarkSolid class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    );
  },
);
