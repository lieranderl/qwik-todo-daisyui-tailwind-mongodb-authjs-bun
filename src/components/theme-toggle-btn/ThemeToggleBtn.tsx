import { component$, useSignal, useVisibleTask$, $, useTask$ } from "@builder.io/qwik";
import { ThemeIconTooltip } from "./ThemeToggleIcons";
import { useThemeLoader } from "~/routes/layout";
import { setCookie } from "typescript-cookie";



interface ThemeToggleBtnProps {
  size?: "xs" | "sm" | "md" | "lg";
}
export const ThemeToggleBtn = component$<ThemeToggleBtnProps>(({ size }) => {
  const themeLoader = useThemeLoader();
  const THEME_MODES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };
  const selectedIcon = useSignal(THEME_MODES.AUTO);
  const selectedTheme = useSignal(themeLoader.value.theme);

  // get theme from themeLoader
  useTask$(async () => {
    if (themeLoader.value.theme === THEME_MODES.DARK) {
      selectedTheme.value = THEME_MODES.DARK;
      selectedIcon.value = THEME_MODES.DARK;
    } else if (themeLoader.value.theme === THEME_MODES.LIGHT) {
      selectedTheme.value = THEME_MODES.LIGHT;
      selectedIcon.value = THEME_MODES.LIGHT;
    } else if (themeLoader.value.theme === THEME_MODES.AUTO) {
      selectedIcon.value = THEME_MODES.AUTO;
    }
    // window
    //   .matchMedia("(prefers-color-scheme: dark)")
    //   .addEventListener("change", (e) => {
    //     if (selectedIcon.value === THEME_MODES.AUTO) {
    //       if (e.matches) {
    //         selectedTheme.value = THEME_MODES.DARK;
    //       } else {
    //         selectedTheme.value = THEME_MODES.LIGHT;
    //       }
    //     }
    //   });
  });
  

//////////////////
  useVisibleTask$(async () => {
    // if (localStorage.theme === THEME_MODES.DARK) {
    //   selectedTheme.value = THEME_MODES.DARK;
    //   selectedIcon.value = THEME_MODES.DARK;
    // } else if (localStorage.theme === THEME_MODES.LIGHT) {
    //   selectedTheme.value = THEME_MODES.LIGHT;
    //   selectedIcon.value = THEME_MODES.LIGHT;
    // } else if (localStorage.theme === THEME_MODES.AUTO) {
    //   selectedIcon.value = THEME_MODES.AUTO;
    // }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (selectedIcon.value === THEME_MODES.AUTO) {
          if (e.matches) {
            selectedTheme.value = THEME_MODES.DARK;
          } else {
            selectedTheme.value = THEME_MODES.LIGHT;
          }
        }
      });
  });

  // track selectedTheme changes
  useVisibleTask$(async ({ track }) => {
    track(() => {
      selectedTheme.value;
    });
    document.documentElement.setAttribute("data-theme", selectedTheme.value);
  });

  const toggleTheme = $(() => {
    if (selectedIcon.value === THEME_MODES.AUTO) {
      selectedTheme.value = THEME_MODES.DARK;
      selectedIcon.value = THEME_MODES.DARK;
      setCookie("theme", THEME_MODES.DARK);
    } else if (selectedIcon.value === THEME_MODES.DARK) {
      selectedTheme.value = THEME_MODES.LIGHT;
      selectedIcon.value = THEME_MODES.LIGHT;
      setCookie("theme", THEME_MODES.LIGHT);
    } else if (selectedIcon.value === THEME_MODES.LIGHT) {
      selectedIcon.value = THEME_MODES.AUTO;
      setCookie("theme", THEME_MODES.AUTO);
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        selectedTheme.value = THEME_MODES.DARK;
      } else {
        selectedTheme.value = THEME_MODES.LIGHT;
      }
    }
  });

  return (
    <div
      data-tip={
        selectedIcon.value[0].toUpperCase() + selectedIcon.value.slice(1)
      }
      onClick$={() => toggleTheme()}
    >
      <ThemeIconTooltip
        selector={selectedIcon.value}
        size={size}
      ></ThemeIconTooltip>
    </div>
  );
});
