import type { PropFunction, QRL } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ToastBody } from "./toast-stack";
import { getIconByType } from "./utils";
import { HiXMarkSolid } from "@qwikest/icons/heroicons";

export type ToastBodyComponentProps = {
  closeToast: QRL<PropFunction<() => void>>;
} & ToastBody;

export const ToastBodyComponent = component$(
  ({ message, type, closeToast }: ToastBodyComponentProps) => {
    const classAlert = useSignal("flex items-center justify-between alert");

    useTask$(() => {
      if (type === "info") classAlert.value = classAlert.value + " alert-info";
      if (type === "success")
        classAlert.value = classAlert.value + " alert-success";
      if (type === "warning")
        classAlert.value = classAlert.value + " alert-warning";
      if (type === "error")
        classAlert.value = classAlert.value + " alert-error";
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
          onClick$={closeToast}
        >
          <HiXMarkSolid class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    );
  },
);
