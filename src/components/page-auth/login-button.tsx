import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { $, Slot, component$ } from "@builder.io/qwik";
import { useAuthSignin } from "~/routes/plugin@auth";

export type LoginButtonProps = QwikIntrinsicElements["button"] & {
  providerName: string;
};

export const LoginButton = component$<LoginButtonProps>((props) => {
  const loginBtnClass = "btn btn-secondary justify-start ";
  const fullClass = props.class ? loginBtnClass + props.class : loginBtnClass;
  const providerName = props.providerName || "google";
  const signIn = useAuthSignin();
  return (
    <button
      class={fullClass}
      onClick$={$(() => {
        signIn.submit({
          providerId: providerName,
          options: { callbackUrl: "/" },
        });
      })}
    >
      <div class="flex items-start items-center gap-2 ">
        <div class="text-2xl">
          <Slot></Slot>
        </div>
        <span>
          Login with <span class="capitalize">{providerName}</span>
        </span>
      </div>
    </button>
  );
});
