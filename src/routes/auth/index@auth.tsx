import { component$, $, useSignal } from "@builder.io/qwik";
import { SiGithub, SiGoogle } from "@qwikest/icons/simpleicons";
import { useAuthSignin } from "~/routes/plugin@auth";


export default component$(() => {
  const signIn = useAuthSignin();
  const isLoading = useSignal(false);
  return (
    <div class="flex items-center justify-center mx-auto h-[calc(100vh-400px)]">
      <div class="text-center md:space-y-20 space-y-10 grid justify-items-center">
        <p class="md:text-4xl font-bold text-2xl">
          Welcome! Please login.
        </p>
        <div class="w-fit flex flex-col items-start gap-y-2">
         <button class="btn btn-primary btn-sm"
            
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
          <button class="btn btn-primary btn-sm"
            
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
      </div>
    </div>
  );
});
