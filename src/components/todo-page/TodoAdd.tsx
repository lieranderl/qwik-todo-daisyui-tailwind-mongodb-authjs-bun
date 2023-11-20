import { component$ } from "@builder.io/qwik";
import { HiPlusCircleOutline } from "@qwikest/icons/heroicons";

export const TodoAdd = component$(() => {
  return (
    <>
      <div
        class="md:tooltip md:tooltip-bottom"
        data-tip={"Add TODO"}
        onClick$={() => {
          const el = document.getElementById("addtodo_modal") as HTMLDialogElement;
          el.showModal()
        }}
      >
        <HiPlusCircleOutline class="h-8 w-8" />
        <span class="md:hidden">Add TODO</span>
      </div>
    </>
  );
});
