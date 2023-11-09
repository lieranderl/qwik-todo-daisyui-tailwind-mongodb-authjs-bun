import { Slot, component$ } from "@builder.io/qwik";
import { ThemeToggleBtn } from "../theme-toggle-btn/ThemeToggleBtn";
import { TitleOnToolBar } from "./TitleOnToolBar";
import { AvatarMenu } from "./AvatarMenu";
import { SideMenu } from "./SideMenu";

export const Navbar = component$(() => {
  return (
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="sticky top-0 z-30 z-50 mx-auto flex h-16  w-full w-full justify-center bg-opacity-50 backdrop-blur-sm">
          <div class="navbar w-full">
            <div class="flex-0">
              {/* hambuger menu */}
              <label
                for="my-drawer-3"
                aria-label="open sidebar"
                class="btn btn-square btn-ghost lg:hidden"
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
            <div class="flex flex-1 md:gap-1 lg:gap-2">
              <div class="flex items-center lg:hidden">
                <TitleOnToolBar />
              </div>
            </div>
            <div class="flex-0">
              <ThemeToggleBtn size="sm" />
              <AvatarMenu />
            </div>
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
          //   class="drawer-overlay"
        ></label>
        <aside class="w-50 min-h-full bg-base-100 bg-opacity-50 backdrop-blur-sm">
          <div class="hidden h-16 items-center px-2 lg:flex">
            <TitleOnToolBar />
          </div>
          <SideMenu />
        </aside>
      </div>
    </div>
  );
});
