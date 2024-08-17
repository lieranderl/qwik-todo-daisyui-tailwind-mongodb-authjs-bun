import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "~/routes/plugin@auth";

export const AvatarMenu = component$(() => {
  const session = useSession();
  const signOut = useSignOut();
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
              <Link class="justify-between">
                {session.value.user.name}
                <span class="badge">New</span>
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <div onClick$={() => signOut.submit({ redirectTo: "/auth" })}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
});
