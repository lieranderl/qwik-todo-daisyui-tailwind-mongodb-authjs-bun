import { component$ } from "@builder.io/qwik";

interface ToastProgressBarProps {
  progress: number;
}

export const ToastProgressBar = component$(
  ({ progress }: ToastProgressBarProps) => {
    return (
      <progress
        class="progress absolute bottom-[0px] left-[0px] w-[100%] animate-progress-slide bg-neutral"
        value="0"
        max="100"
        style={`--bar-duration:${progress}ms;`}
      ></progress>
    );
  },
);
