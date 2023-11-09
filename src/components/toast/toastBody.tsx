import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ToastBody } from "./toastStack";
import { getIconByType } from "./utils";

export type ToastBodyComponentProps = {
  closeToast: PropFunction;
} & ToastBody;

export const ToastBodyComponent = component$(
  ({ message, type, autocloseTime, closeToast }: ToastBodyComponentProps) => {
    const classText = useSignal("mx-2 text-sm");

    useTask$(() => {
      if (type === "info") classText.value = "mx-2 text-sm text-info";
      if (type === "success") classText.value = "mx-2 text-sm text-success";
      if (type === "warning") classText.value = "mx-2 text-sm text-warning";
      if (type === "error") classText.value = "mx-2 text-sm text-error";
    });

    return (
      <div
        id="toast"
        class={[
          autocloseTime
            ? "flex items-center justify-between rounded-t-lg border-base-200 bg-base-100 p-2"
            : "flex items-center justify-between rounded-lg border-base-200 bg-base-100 p-2",
        ]}
        role="alert"
      >
        <div class="flex items-center">
          <div class="flex h-6 w-6 flex-shrink-0 items-center justify-center">
            {getIconByType(type)}
            <span class="sr-only">Check icon</span>
          </div>
          <div class={classText.value}>{message}</div>{" "}
        </div>

        <button
          type="button"
          class="rounded-lg p-1 text-sm focus:outline-none focus:ring-0"
          aria-label="Close"
          onClick$={closeToast}
        >
          <span class="sr-only">Close</span>
          <svg
            class="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    );
  },
);
