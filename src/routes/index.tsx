import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar/Navbar";
import { TestContent } from "~/components/test-content/TestContent";

export default component$(() => {

  return (
    <>
      <Navbar>
        <TestContent />
      </Navbar>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
