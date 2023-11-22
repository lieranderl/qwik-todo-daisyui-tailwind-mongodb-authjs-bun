import { component$ } from "@builder.io/qwik";
import { SiGoogle, SiGithub, SiFacebook } from "@qwikest/icons/simpleicons";
import { LoginButton } from "./LoginButton";

export const LoginButtons = component$(() => {
  return (
    <div class="flex w-fit flex-col gap-y-1">
      <LoginButton providerName="google">
        <SiGoogle></SiGoogle>
      </LoginButton>
      <LoginButton providerName="github">
        <SiGithub></SiGithub>
      </LoginButton>
      <LoginButton providerName="facebook" class="btn-disabled">
        <SiFacebook></SiFacebook>
      </LoginButton>
    </div>
  );
});