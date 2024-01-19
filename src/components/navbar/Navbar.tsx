import { Slot, component$ } from "@builder.io/qwik";
import { TitleOnToolBar } from "./title-toolbar";
import { AvatarMenu } from "./avatar-menu";
import { SideMenu } from "./side-menu";
import { ThemeToggle } from "qwik-theme-toggle";
import { HiBars3Solid } from "@qwikest/icons/heroicons";

export const Navbar = component$(() => {
  return (
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="navbar sticky top-0 z-10 h-4 bg-opacity-50 backdrop-blur-sm">
          <div class="flex-none md:hidden">
            <label
              for="my-drawer"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <HiBars3Solid class="text-3xl" />
            </label>
          </div>
          <TitleOnToolBar />

          <div class="hidden flex-none md:block">
            <ul class="menu menu-horizontal">
              <SideMenu />
            </ul>
          </div>
          <div class="flex-0">
            <ThemeToggle
              themeStorageKey="theme" // name of the local storage theme key
              textSize="text-3xl" // Size of the toggle button
            />
            <AvatarMenu />
          </div>
        </div>
        <div class="container mx-auto pt-2">
          <Slot />
        </div>
      </div>
      <div class="drawer-side z-20">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        />
        <ul class="menu min-h-full w-60 bg-base-200 p-4 pt-24">
          <SideMenu />
        </ul>
      </div>
    </div>
  );
});
