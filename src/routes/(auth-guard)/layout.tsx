import type { Session } from "@auth/core/types";
import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar/navbar";


export const onRequest: RequestHandler = (event) => {
  event.cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  }); // disable caching
  
  //auth guard
  const session: Session | null = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date() || session.error) {
    throw event.redirect(302, `/auth/`);
  }
};


export default component$(() => {
  return (
      <Navbar>
        <Slot />
      </Navbar>
  );
});
