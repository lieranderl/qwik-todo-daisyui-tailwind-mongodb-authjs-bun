import { $, component$, useSignal } from "@builder.io/qwik";
import { SiGoogle, SiGithub } from "@qwikest/icons/simpleicons";
import { useAuthSignin } from "../../routes/plugin@auth";

export const LoginButtons = component$(() => {
  const signIn = useAuthSignin();
  const isLoading = useSignal(false);
  return (
    <div class="flex w-fit flex-col gap-y-2">
      <button
        class="btn btn-primary btn-sm"
        onClick$={$(() => {
          isLoading.value = true;
          signIn.submit({
            providerId: "google",
            options: { callbackUrl: "/" },
          });
        })}
      >
        <div class="flex gap-2">
          <SiGoogle></SiGoogle>
          Login with Google
        </div>
      </button>
      <button
        class="btn btn-primary btn-sm"
        onClick$={$(() => {
          isLoading.value = true;
          signIn.submit({
            providerId: "github",
            options: { callbackUrl: "/" },
          });
        })}
      >
        <div class="flex gap-2">
          <SiGithub></SiGithub>
          Login with GitHub
        </div>
      </button>
    </div>
  );
});
