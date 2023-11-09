import { component$ } from "@builder.io/qwik";

interface ToastProgressBarProps {
  progress: number;
}

export const ToastProgressBar = component$(
  ({ progress }: ToastProgressBarProps) => {
    return (
      <div class="h-1.5 w-full rounded-b-lg border-base-200 bg-base-100 ">
        <div
          class="h-1.5 animate-progress-slide rounded-b-lg border-base-200 bg-base-200 "
          style={`--bar-duration:${progress}ms`}
        ></div>
      </div>
    );
  },
);
