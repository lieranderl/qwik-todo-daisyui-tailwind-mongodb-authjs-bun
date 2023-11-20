import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { LoginButtons } from "../../components/page-quth/LoginButtons";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

export const useCheckSession = routeLoader$(async (event) => {
  const session = event.sharedMap.get("session");
  if (session && session.expires > new Date().toISOString()) {
    return { redirect: "/" };
  }
  return {};
});

export default component$(() => {
  const checksession = useCheckSession();

  useVisibleTask$(async () => {
    //check session and route to home if session exists
    if (checksession.value.redirect) {
      //navigete to home
      window.location.replace(checksession.value.redirect);
    }
  });

  return (
    <div
      class="hero min-h-screen"
      style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);"
    >
      <div class="hero-overlay bg-base-200 bg-opacity-80"></div>
      <div class="hero-content text-center text-base">
        <div class="flex max-w-xl flex-col items-center">
          <h1 class="mb-5 text-3xl font-bold sm:text-5xl">Welcome to TODO</h1>
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
          <LoginButtons />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to TODO app",
  meta: [
    {
      name: "description",
      content: "Welcome to TODO app",
    },
  ],
};
