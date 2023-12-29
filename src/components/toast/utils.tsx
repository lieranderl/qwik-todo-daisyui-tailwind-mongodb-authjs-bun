import {
  HiCheckSolid,
  HiExclamationTriangleSolid,
  HiInformationCircleSolid,
  HiXCircleSolid,
} from "@qwikest/icons/heroicons";
import type { ToastType } from "./toast";
import { $ } from "@builder.io/qwik";

export const getIconByType = $((type: ToastType) => {
  switch (type) {
    case "success":
      return <HiCheckSolid class="h-6 w-6" aria-hidden="true" />;
    case "error":
      return <HiXCircleSolid class="h-6 w-6" aria-hidden="true" />;
    case "warning":
      return (
        <HiExclamationTriangleSolid
          class="h-6 w-6"
          aria-hidden="true"
        />
      );
    case "info":
      return (
        <HiInformationCircleSolid
          class="h-6 w-6"
          aria-hidden="true"
        />
      );
    default:
      return <></>;
  }
});
