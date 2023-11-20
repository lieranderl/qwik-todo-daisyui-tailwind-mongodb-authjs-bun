import { component$ } from "@builder.io/qwik";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";

export const AvatarMenu = component$(() => {
  const session = useAuthSession();
  const signOut = useAuthSignout();
  return (
    <>
      {session.value && session.value.user && (
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="avatar btn btn-circle btn-ghost">
            {session.value.user.image && (
              <div class="w-10 rounded-full">
                <img width="844" height="844" src={session.value.user.image} />
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                {session.value.user.name}
                <span class="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick$={() => signOut.submit({ callbackUrl: "/auth" })}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
});
