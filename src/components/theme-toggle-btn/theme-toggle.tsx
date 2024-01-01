import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
  useTask$,
} from "@builder.io/qwik";
import { ThemeIconTooltip } from "./theme-icon-selector";
import { server$ } from "@builder.io/qwik-city";
import type { RenderToStreamOptions } from "@builder.io/qwik/server";

interface ThemeToggleBtnProps {
  size?: "xs" | "sm" | "md" | "lg";
}

// set the theme attribute on the html tag
export const themeSetterOpts = (opts: RenderToStreamOptions) => {
  if (opts.serverData && opts.serverData.requestHeaders.cookie) {
    if (opts.serverData.url.includes("theme=")) {
      opts.containerAttributes = {
        ...opts.containerAttributes,
        "data-theme": opts.serverData.url.split("theme=")[1].split("&")[0],
      };
    } else {
      opts.serverData.requestHeaders.cookie
        .split(";")
        .forEach((cookie: string) => {
          if (cookie.includes("theme=")) {
            opts.containerAttributes = {
              ...opts.containerAttributes,
              "data-theme": cookie.split("theme=")[1].split(";")[0],
            };
          }
        });
    }
  }
  return opts;
};

// get the theme cookie
export const getThemeCookie = server$(function () {
  const storedThemeValue = this.cookie.get("theme")?.value;
  return storedThemeValue;
});

// set the theme cookie
export const setThemeCookie = server$(function (themeMode: string) {
  this.cookie.set("theme", themeMode, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 2592000,
    path: "/",
  });
});

export const ThemeToggleBtn = component$<ThemeToggleBtnProps>(({ size }) => {
  const THEME_MODES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };
  const selectedIcon = useSignal(THEME_MODES.AUTO);

  // handling cookies server side
  const handleCookieServerSide = $(async () => {
    let dataTheme;
    const themeModeValue = await getThemeCookie();
    if (themeModeValue !== undefined) {
      if (themeModeValue === THEME_MODES.AUTO) {
        dataTheme = THEME_MODES.DARK;
        selectedIcon.value = THEME_MODES.DARK;
      } else if (themeModeValue === THEME_MODES.DARK) {
        dataTheme = THEME_MODES.LIGHT;
        selectedIcon.value = THEME_MODES.LIGHT;
      } else if (themeModeValue === THEME_MODES.LIGHT) {
        selectedIcon.value = THEME_MODES.AUTO;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          dataTheme = THEME_MODES.DARK;
        } else {
          dataTheme = THEME_MODES.LIGHT;
        }
      }
    }
    setThemeCookie(selectedIcon.value as string);
    document.documentElement.setAttribute("data-theme", `${dataTheme}`);
  });

  useTask$(async () => {
    const themeModeValue = await getThemeCookie();
    if (themeModeValue !== undefined) {
      if (themeModeValue === THEME_MODES.AUTO) {
        selectedIcon.value = THEME_MODES.AUTO;
      } else if (themeModeValue === THEME_MODES.DARK) {
        selectedIcon.value = THEME_MODES.DARK;
      } else if (themeModeValue === THEME_MODES.LIGHT) {
        selectedIcon.value = THEME_MODES.LIGHT;
      }
    } else {
      selectedIcon.value = THEME_MODES.AUTO;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (selectedIcon.value === THEME_MODES.AUTO) {
          if (e.matches) {
            document.documentElement.setAttribute(
              "data-theme",
              `${THEME_MODES.DARK}`,
            );
          } else {
            document.documentElement.setAttribute(
              "data-theme",
              `${THEME_MODES.LIGHT}`,
            );
          }
        }
      });
  });

  return (
    <div onClick$={() => handleCookieServerSide()}>
      <ThemeIconTooltip
        selector={selectedIcon.value}
        size={size}
      ></ThemeIconTooltip>
    </div>
  );
});
