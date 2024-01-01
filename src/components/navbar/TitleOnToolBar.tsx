import { component$ } from "@builder.io/qwik";
import { SiTailwindcss } from "@qwikest/icons/simpleicons";

export const TitleOnToolBar = component$(() => {
  return (
    <>
      <div class="flex flex-1">
        <SiTailwindcss class="h-14 w-16 fill-current p-1"></SiTailwindcss>
        <div class="mx-2 flex-none px-2">TODO app</div>
      </div>
    </>
  );
});
