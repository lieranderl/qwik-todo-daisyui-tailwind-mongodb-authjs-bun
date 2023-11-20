import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { HiSunOutline, HiMoonOutline } from "@qwikest/icons/heroicons";
const ThemeIconDark = component$(() => {
  return (
    <HiMoonOutline></HiMoonOutline>

    // <svg
    //   class="fill-current"
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    // >
    //   <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
    // </svg>
  );
});

const ThemeIconLight = component$(() => {
  return (
    <HiSunOutline></HiSunOutline>
    // <svg
    //   class="fill-current"
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    // >
    //   <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
    // </svg>
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
    const baseClass = "tooltip tooltip-bottom btn btn-ghost p-1 font-normal ";
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
