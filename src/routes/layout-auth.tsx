import { component$, Slot } from "@builder.io/qwik";
import type { JSONValue } from "@builder.io/qwik-city";
import {
  routeLoader$,
  type RequestHandler,
  routeAction$,
} from "@builder.io/qwik-city";

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

// export const useTokenCookies = routeAction$(
//   async (uid: JSONValue, requestEvent) => {
//     // This will only run on the server when the user submits the form (or when the action is called programatically)
//     console.log("useTokenCookies AUTH path");
//     const u = uid as { uid: string };
//     if (u.uid) {
//       requestEvent.cookie.set("uid", u.uid as string, { path: "/" });
//       return {
//         success: true,
//         uid,
//       };
//     } else {
//       requestEvent.cookie.delete("uid", { path: "/" });
//       return {
//         success: false,
//       };
//     }
//   }
// );

// export const useQueryParamsLoader = routeLoader$(async (event) => {
//   const lang = event.query.get("lang") || "en-US";
//   return { lang };
// });

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
