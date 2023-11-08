import { component$ } from "@builder.io/qwik";

interface ToastProgressBarProps {
  progress: number;
}

export const ToastProgressBar = component$(
  ({ progress }: ToastProgressBarProps) => {
    return (
      <div class="w-full rounded-b-lg h-1.5 bg-base-100 border-base-200 ">
        <div
          class="h-1.5 rounded-b-lg animate-progress-slide bg-base-200 border-base-200 "
          style={`--bar-duration:${progress}ms`}
        ></div>
      </div>
    );
  }
);
