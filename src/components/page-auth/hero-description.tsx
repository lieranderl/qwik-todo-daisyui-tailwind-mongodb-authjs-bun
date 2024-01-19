import { component$ } from "@builder.io/qwik";

export const HeroDescription = component$(() => {
  return (
    <div class="mb-5 flex flex-col text-sm sm:text-base">
      <p>
        <span>This is a simple TODO app built with </span>
        <span class="font-bold">
          <a href="https://qwik.builder.io/">Qwik</a>
        </span>
        .
      </p>
      <p>
        It uses{" "}
        <span class="font-bold">
          <a href="https://authjs.dev/">Authjs</a>
        </span>{" "}
        with
        <span class="font-bold">
          <a href="https://www.mongodb.com/"> MongoDB Atlas</a>
        </span>{" "}
        for authentication and storage.
      </p>
      <p>
        <span class="font-bold">
          <a href="https://tailwindcss.com/">Tailwindcss</a>
        </span>{" "}
        +
        <span class="font-bold">
          <a href="https://daisyui.com/"> DaisyUI</a>
        </span>{" "}
        with custom light and dark themes are used for styling.
      </p>
    </div>
  );
});
