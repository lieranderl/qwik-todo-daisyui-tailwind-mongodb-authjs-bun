import {
  component$,
  $,
  useContext,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import type { ToastBody } from "./toastStack";
import { toastManagerContext } from "./toastStack";
import { ToastProgressBar } from "./progressbar";
import { ToastBodyComponent } from "./toastBody";
export type ToastType = "success" | "error" | "warning" | "info";

type ToastId = {
  id: string;
};

export type ToastProps = ToastBody & ToastId;

export const Toast = component$(
  ({ id, message, type, autocloseTime }: ToastProps) => {
    const toastsFunc = useContext(toastManagerContext);
    const animClas = useSignal("animate-slide-in-right");
    const closeToast = $(() => {
      animClas.value = "animate-slide-out-right";
      setTimeout(() => {
        toastsFunc.removeToast(id);
      }, 400);
    });

    useVisibleTask$(() => {
      if (autocloseTime) {
        if (autocloseTime > 0) {
          setTimeout(() => {
            animClas.value = "animate-slide-out-right";
            setTimeout(() => {
              toastsFunc.removeToast(id);
            }, 400);
          }, autocloseTime);
        }
      }
    });

    return (
      <div class={[animClas.value, "mb-2", "drop-shadow-lg"]}>
        <ToastBodyComponent
          message={message}
          type={type}
          autocloseTime={autocloseTime}
          closeToast={closeToast}
        />
        {autocloseTime && <ToastProgressBar progress={autocloseTime} />}
      </div>
    );
  }
);
