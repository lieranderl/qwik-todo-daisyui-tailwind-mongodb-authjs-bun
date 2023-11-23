import { Slot, component$ } from "@builder.io/qwik";
import { ThemeToggleBtn } from "../theme-toggle-btn/ThemeToggleBtn";
import { TitleOnToolBar } from "./TitleOnToolBar";
import { AvatarMenu } from "./AvatarMenu";
import { SideMenu } from "./SideMenu";

export const Navbar = component$(() => {
  return (
    <div class="drawer  ">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="navbar sticky top-0 z-10 h-4 bg-opacity-50 backdrop-blur-sm">
          <div class="flex-none md:hidden">
            <label
              for="my-drawer-3"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <TitleOnToolBar />

          <div class="hidden flex-none md:block">
            <ul class="menu menu-horizontal">
              <SideMenu />
            </ul>
          </div>
          <div class="flex-0">
            <ThemeToggleBtn size="sm" />
            <AvatarMenu />
          </div>
        </div>
        <div class="container mx-auto pt-2">
          <Slot />
        </div>
      </div>
      <div class="drawer-side z-20">
        <label
          for="my-drawer-3"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu min-h-full w-60 bg-base-200 p-4 pt-24">
          <SideMenu />
        </ul>
      </div>
    </div>
  );
});
