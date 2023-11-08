import { component$ } from "@builder.io/qwik";

export const SideMenu = component$(() => {
  return (
    <ul class="menu p-4 pt-16 lg:pt-4">
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
      <li>
        <a>Item 4</a>
      </li>
    </ul>
  );
});
