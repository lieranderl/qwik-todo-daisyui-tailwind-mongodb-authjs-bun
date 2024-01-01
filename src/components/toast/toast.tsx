import {
  component$,
  $,
  useContext,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import type { ToastBody } from "./toast-stack";
import { toastManagerContext } from "./toast-stack";
import { ToastProgressBar } from "./progressbar";
import { ToastBodyComponent } from "./toast-body";
export type ToastType = "success" | "error" | "warning" | "info";
import styles from './toast.css?inline';

type ToastId = {
  id: string;
};

export type ToastProps = ToastBody & ToastId;

export const Toast = component$(
  ({ id, message, type, autocloseTime }: ToastProps) => {
    useStyles$(styles);
    const toastsFunc = useContext(toastManagerContext);
    const baseClass = " drop-shadow-lg w-90 sm:w-120";
    const animClas = useSignal("slide-in-right" + baseClass);
    const closeToast = $(() => {
      animClas.value = "slide-out-right" + baseClass;
      setTimeout(() => {
        toastsFunc.removeToast(id);
      }, 400);
    });

    // autoclose timeout
    if (autocloseTime && autocloseTime > 0) {
      setTimeout(() => {
        animClas.value = "slide-out-right" + baseClass;
        setTimeout(() => {
          toastsFunc.removeToast(id);
        }, 400);
      }, autocloseTime);
    }

    return (
      <div class={animClas.value}>
        <ToastBodyComponent
          message={message}
          type={type}
          autocloseTime={autocloseTime}
          closeToast={closeToast}
        />
        {autocloseTime && <ToastProgressBar progress={autocloseTime} />}
      </div>
    );
  },
);
