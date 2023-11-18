/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
  // get them from the cookie and set it on the html tag
  if (opts.serverData && opts.serverData.requestHeaders.cookie) {
    opts.serverData.requestHeaders.cookie.split(";").forEach((cookie: string) => {
      if (cookie.includes("theme=")) {
        opts.containerAttributes = {
          ...opts.containerAttributes,
          "data-theme": cookie.split("theme=")[1],
        };
      }
    })
  }

  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes,
    },
  });
}
