import { component$ } from "@builder.io/qwik";
import { SiTailwindcss } from "@qwikest/icons/simpleicons";

export const TitleOnToolBar = component$(() => {
  return (
    <div class="flex flex-1 mx-2 gap-2">
      <SiTailwindcss class="text-6xl"></SiTailwindcss>
      <div class="flex-none">TODO app</div>
    </div>
  );
});
