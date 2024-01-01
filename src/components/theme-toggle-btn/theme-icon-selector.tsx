import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { HiSunOutline, HiMoonOutline } from "@qwikest/icons/heroicons";
const ThemeIconDark = component$(() => {
  return (
    <HiMoonOutline></HiMoonOutline>
  );
});

const ThemeIconLight = component$(() => {
  return (
    <HiSunOutline></HiSunOutline>
  );
});

const ThemeIconAuto = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current"
      viewBox="0 0 24 24"
    >
      <path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"></path>
    </svg>
  );
});
interface SelectorProps {
  selector: String;
  size?: "xs" | "sm" | "md" | "lg";
}

const ThemeIcon = component$<SelectorProps>(({ selector, size }) => {
  const classIconSig = useSignal("text-3xl animate-rotate45");

  useTask$(() => {
    switch (size) {
      case "xs":
        classIconSig.value = "text-xl animate-rotate45";
        break;
      case "sm":
        classIconSig.value = "text-2xl animate-rotate45";
        break;
      case "lg":
        classIconSig.value = "text-4xl animate-rotate45";
        break;
      default:
        classIconSig.value = "text-3xl animate-rotate45";
        break;
    }
  });

  switch (selector) {
    case "light":
      return (
        <div class={classIconSig.value}>
          <ThemeIconLight />
        </div>
      );
    case "dark":
      return (
        <div class={classIconSig.value}>
          <ThemeIconDark />
        </div>
      );
    default:
      return (
        <div class={classIconSig.value}>
          <ThemeIconAuto />
        </div>
      );
  }
});

export const ThemeIconTooltip = component$<SelectorProps>(
  ({ selector, size }) => {
    const baseClass = "tooltip tooltip-bottom btn btn-ghost px-1 font-normal ";
    const classIconSig = useSignal(baseClass + "w-12");
    useTask$(() => {
      switch (size) {
        case "xs":
          classIconSig.value = baseClass + "w-8";
          break;
        case "sm":
          classIconSig.value = baseClass + "w-10";
          break;
        case "lg":
          classIconSig.value = baseClass + "w-14";
          break;
        default:
          classIconSig.value = baseClass + "w-12";
          break;
      }
    });
    return (
      <button
        class={classIconSig.value}
        data-tip={selector[0].toUpperCase() + selector.slice(1)}
      >
        <ThemeIcon selector={selector} size={size} />
      </button>
    );
  },
);
