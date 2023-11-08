import type { PropFunction} from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ToastBody } from "./toastStack";
import { getIconByType } from "./utils";

export type ToastBodyComponentProps = {
    closeToast: PropFunction;
  } & ToastBody;
  
  export const ToastBodyComponent = component$(
    ({ message, type, autocloseTime, closeToast }: ToastBodyComponentProps) => {


      const classText = useSignal("mx-2 text-sm ")

      useTask$(() => {
        if (type === "info") classText.value = "mx-2 text-sm  text-info"
        if (type === "success") classText.value = "mx-2 text-sm  text-success"
        if (type === "warning") classText.value = "mx-2 text-sm text-warning"
        if (type === "error") classText.value = "mx-2 text-sm text-error"
      })

      return (
        <div
          id="toast"
          class={[
            autocloseTime
              ? "flex items-center justify-between p-2  rounded-t-lg bg-base-100 border-base-200"
              : "flex items-center justify-between p-2  rounded-lg bg-base-100 border-base-200 ",
          ]}
          role="alert"
        >
          <div class="flex items-center">
            <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
              {getIconByType(type)}
              <span class="sr-only">Check icon</span>
            </div>
            <div class={classText.value}>{message}</div>{" "}
          </div>
  
          <button
            type="button"
            class="focus:outline-none focus:ring-0 rounded-lg text-sm p-1"
            aria-label="Close"
            onClick$={closeToast}
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
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
    }
  );
  