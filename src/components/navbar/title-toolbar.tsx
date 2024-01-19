import { component$ } from "@builder.io/qwik";
import { SiTailwindcss } from "@qwikest/icons/simpleicons";

export const TitleOnToolBar = component$(() => {
  return (
    <div class="mx-2 flex flex-1 gap-2">
      <SiTailwindcss class="text-6xl"></SiTailwindcss>
      <div class="flex-none">TODO app</div>
    </div>
  );
});
