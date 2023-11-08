import { component$ } from "@builder.io/qwik";
import { CiscoIcon } from "./CiscoIcon";

export const TitleOnToolBar = component$(() => {
  return (
    <>
      <CiscoIcon />
      <div class="mx-2 flex-none px-2">Something</div>
    </>
  );
});
