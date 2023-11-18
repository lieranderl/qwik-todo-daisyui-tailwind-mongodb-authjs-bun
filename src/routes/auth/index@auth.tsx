import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { LoginButtons } from "../../components/auth-page/LoginButtons";
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
        <div class="flex max-w-lg flex-col items-center">
          <h1 class="mb-5 text-5xl font-bold">Welcome to TODO</h1>
          <div class="mb-5 flex flex-col ">
            <p>This is a simple TODO app built with Qwik.</p>
            <p>
              It uses Authjs with Mongo Atlas for authentication and storage.
            </p>
            <p>Daisyui with custom themes is used for styling.</p>
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
