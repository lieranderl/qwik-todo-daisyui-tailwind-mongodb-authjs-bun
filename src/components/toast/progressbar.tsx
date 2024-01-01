import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./toast.css?inline";

interface ToastProgressBarProps {
  progress: number;
}

export const ToastProgressBar = component$(
  ({ progress }: ToastProgressBarProps) => {
    useStyles$(styles);
    return (
      <progress
        class="progress absolute bottom-[0px] left-[0px] w-[100%] progress-slide bg-neutral"
        value="0"
        max="100"
        style={`--bar-duration:${progress}ms;`}
      ></progress>
    );
  },
);
