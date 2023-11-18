import { component$ } from "@builder.io/qwik";
import { LoginButtons } from "../../components/auth-page/LoginButtons";

export default component$(() => {
  return (
    <div
      class="hero min-h-screen"
      style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);"
    >
      <div class="hero-overlay bg-base-200 bg-opacity-80"></div>
      <div class="hero-content text-center text-base">
        <div class="flex max-w-md flex-col items-center">
          <h1 class="mb-5 text-5xl font-bold">Welcome to TODO</h1>
          <p class="mb-5">
           This is a simple TODO app built with Qwik. It uses Authjs with Mongo Atlas for authentication and storage.
          </p>
         <LoginButtons/>
        </div>
      </div>
    </div>
  );
});
