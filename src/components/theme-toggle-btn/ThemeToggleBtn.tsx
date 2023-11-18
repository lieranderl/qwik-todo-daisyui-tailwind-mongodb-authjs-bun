import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
  useTask$,
} from "@builder.io/qwik";
import { ThemeIconTooltip } from "./ThemeToggleIcons";
import { useThemeLoader } from "~/routes/layout";
import { setCookie } from "typescript-cookie";
import mongoClientPromise from "~/routes/auth/mongodbinit";
import { useAuthSession } from "~/routes/plugin@auth";
import { ObjectId } from "mongodb";
import { server$ } from "@builder.io/qwik-city";

interface ThemeToggleBtnProps {
  size?: "xs" | "sm" | "md" | "lg";
}
export const ThemeToggleBtn = component$<ThemeToggleBtnProps>(({ size }) => {
  const themeLoader = useThemeLoader();
  const THEME_MODES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };
  const selectedIcon = useSignal(THEME_MODES.AUTO);
  const selectedTheme = useSignal(themeLoader.value.theme);
  const session = useAuthSession();
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
  });

  //////////////////
  useVisibleTask$(async () => {
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

  const updateThemeDb = server$(async () => { 
    const mongo = await mongoClientPromise;
    const usersCol = mongo.db("testing").collection("users");
    console.log(selectedIcon.value);
    await usersCol.updateOne(
      { _id: new ObjectId(session.value?.id) },
      { $set: { theme: selectedIcon.value } },
    );
  });


  const toggleTheme = $(async () => {
    console.log(session)
    if (selectedIcon.value === THEME_MODES.AUTO) {
      selectedTheme.value = THEME_MODES.DARK;
      selectedIcon.value = THEME_MODES.DARK;
      setCookie("theme", THEME_MODES.DARK);
      updateThemeDb();
    } else if (selectedIcon.value === THEME_MODES.DARK) {
      selectedTheme.value = THEME_MODES.LIGHT;
      selectedIcon.value = THEME_MODES.LIGHT;
      setCookie("theme", THEME_MODES.LIGHT);
      updateThemeDb();
    } else if (selectedIcon.value === THEME_MODES.LIGHT) {
      selectedIcon.value = THEME_MODES.AUTO;
      setCookie("theme", THEME_MODES.AUTO);
      updateThemeDb();
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
