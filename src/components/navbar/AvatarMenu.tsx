import { component$ } from "@builder.io/qwik";

export const AvatarMenu = component$(() => {
  return (
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="avatar btn btn-circle btn-ghost">
        <div class="w-10 rounded-full">
          <img
            width="844"
            height="844"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
});
