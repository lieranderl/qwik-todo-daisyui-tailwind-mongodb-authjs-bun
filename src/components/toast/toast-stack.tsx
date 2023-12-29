import type { QRL } from "@builder.io/qwik";
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  $,
} from "@builder.io/qwik";
import type { ToastProps, ToastType } from "./toast";
import { Toast } from "./toast";
import { v4 as uuidv4 } from "uuid";

export const toastManagerContext = createContextId<{
  addToast: QRL<(toast: ToastBody) => string>;
  removeToast: QRL<(id: string) => void>;
  removeAllToasts: QRL<() => void>;
  removeAllToastsByType: QRL<(type: ToastType) => void>;
}>("toastManagerContext");

export type ToastBody = {
  message: string;
  type: ToastType;
  autocloseTime?: number;
};

export const ToastStack = component$(() => {
  const toastsStore = useStore({ toasts: [] as ToastProps[] });
  const toastManager = useStore({
    addToast: $((toast: ToastBody) => {
      const ui = uuidv4();
      toastsStore.toasts.push({ ...toast, id: ui });
      return ui;
    }),
    removeToast: $((id: string) => {
      toastsStore.toasts = toastsStore.toasts.filter(
        (toast) => toast.id !== id,
      );
    }),
    removeAllToasts: $(() => {
      toastsStore.toasts = [];
    }),
    removeAllToastsByType: $((type: ToastType) => {
      toastsStore.toasts = toastsStore.toasts.filter(
        (toast) => toast.type !== type,
      );
    }),
  });

  useContextProvider(toastManagerContext, toastManager);

  return (
    <>
      <div class="toast toast-end z-[1000]">
        {toastsStore.toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
      <Slot />
    </>
  );
});
