import { component$ } from "@builder.io/qwik";
import { LoginButtons } from "../../components/page-auth/login-buttons-group";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { HeroAuth } from "~/components/page-auth/hero-auth";
import { HeroDescription } from "~/components/page-auth/hero-description";

// Check if user is logged in and needs to be redirected to the main page
export const useCheckSession = routeLoader$(async (event) => {
  const session = event.sharedMap.get("session");
  if (session && session.expires > new Date().toISOString()) {
    throw event.redirect(302, `/`);
  }
});

export default component$(() => {
  useCheckSession();
  return (
    <HeroAuth title="Welcome to TODO app">
      <HeroDescription q:slot="hero-description" />
      <LoginButtons q:slot="login-buttons" />
    </HeroAuth>
  );
});

export const head: DocumentHead = {
  title: "Welcome to TODO app",
  meta: [
    {
      name: "Auth page",
      content: "Welcome to TODO app",
    },
  ],
};
