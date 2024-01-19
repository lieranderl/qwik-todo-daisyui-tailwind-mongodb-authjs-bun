import { Slot, component$ } from "@builder.io/qwik";

export type HeroAuthProps = {
  title: string;
};

export const HeroAuth = component$<HeroAuthProps>(({ title }) => {
  return (
    <div
      class="hero min-h-screen"
      style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);"
    >
      <div class="hero-overlay bg-base-200 bg-opacity-80"></div>
      <div class="hero-content text-center text-base">
        <div class="flex max-w-xl flex-col items-center">
          <h1 class="mb-5 text-3xl font-bold sm:text-5xl">{title}</h1>
          <Slot name="hero-description" />
          <Slot name="login-buttons" />
        </div>
      </div>
    </div>
  );
});
