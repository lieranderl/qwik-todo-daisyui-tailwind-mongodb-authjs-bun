import type { Session } from "@auth/core/types";
import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar/Navbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });  
};
//auth guard
export const onRequest: RequestHandler = (event) => {
  event.cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  }); // disable caching
  //auth guard
  const session: Session | null = event.sharedMap.get("session");  
  if (!session || new Date(session.expires) < new Date() || session.error) {
    throw event.redirect(302, `/auth`);
  }
};

export const useThemeLoader = routeLoader$(async (event) => {
  const session = event.sharedMap.get("session");
  const theme = event.query.get("theme");
  if (theme) {
    return { theme: theme };
  } else if (session && session.theme) {
    return { theme: session.theme };
  }
  return { theme: "auto" };
});

export default component$(() => {
  return (
    <>
      <Navbar>
        <Slot />
      </Navbar>
    </>
  );
});
